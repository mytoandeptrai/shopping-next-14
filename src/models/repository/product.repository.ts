import { db } from '@/config';
import Category from '@/models/model/category.model';
import Product from '@/models/model/product.model';
import { ICategoryLevel, IColor, IImage, IInfo, IProduct, ISize, ISpecification } from '@/models/type';
import { FilterQuery } from 'mongoose';

import { generatePagination } from '@/lib/utils';

export interface IGetAllProductPayload extends FilterQuery<IProduct> {
  page_size?: number;
  page?: number;
  categoryFilter?: Record<string, any>;
}

interface ICreateProductPayload {
  title: string;
  price: number;
  category: string[];
  images: IImage[];
  info: IInfo[];
  specification: ISpecification[];
  inStock: number;
  description: string;
  discount: number;
  sizes: ISize[];
  colors: IColor[];
  category_levels: ICategoryLevel;
}

interface IUpdateProductPayload extends ICreateProductPayload {
  id: string;
}

type IInsertProductsPayload = IUpdateProductPayload[];

const defaultProductSelect =
  '-description -info -specification -category -category_levels -sizes  -reviews -numReviews';

const getOne = async (filter: IGetAllProductPayload): Promise<IProduct | null> => {
  try {
    await db.connect();
    const product = await Product.findOne(filter).lean().exec();
    await db.disconnect();
    return product as IProduct;
  } catch {
    throw new Error('Error server');
  }
};

const getOneWithSimilarOnes = async (
  filter: IGetAllProductPayload
): Promise<{
  productDetail: IProduct;
  otherSimilarProducts: IProduct[];
}> => {
  try {
    await db.connect();
    const productDetail = (await Product.findOne(filter)
      .populate('category_levels.level_one')
      .populate('category_levels.level_two')
      .populate('category_levels.Level_three')
      .lean()
      .exec()) as IProduct;
    if (!productDetail) throw new Error('Product not found');

    const lastCategoryInProduct = productDetail.category.pop();
    const filterSimilarProducts = {
      category: { $in: lastCategoryInProduct },
      inStock: { $gte: 1 },
      _id: { $ne: productDetail._id },
    };

    const otherSimilarProducts = (await Product.find(filterSimilarProducts)
      .select(defaultProductSelect)
      .limit(10)
      .lean()) as IProduct[];

    await db.disconnect();
    return {
      productDetail,
      otherSimilarProducts,
    };
  } catch {
    throw new Error('Error Server');
  }
};

const getAllProduct = async (filter: IGetAllProductPayload) => {
  const { page_size = 10, page = 1, ...rest } = filter;
  try {
    await db.connect();

    const productData = Product.find(rest)
      .skip((page - 1) * page_size)
      .limit(page_size)
      .sort({
        createdAt: 'desc',
      })
      .select(defaultProductSelect)
      .exec();
    const productCount = Product.countDocuments().exec();
    const productPrice = Product.find({ ...(filter?.categoryFilter ?? {}), inStock: { $gte: 1 } })
      .distinct('price')
      .lean()
      .exec();

    const [products, productLength, price] = await Promise.all([productData, productCount, productPrice]);
    const res = generatePagination(products, productLength, page, page_size);
    await db.disconnect();

    return { ...res, maxPrice: Math.max(...price), minPrice: Math.min(...price) };
  } catch {
    throw new Error('Error Server');
  }
};

const createProduct = async (params: ICreateProductPayload) => {
  await db.connect();
  const existedProduct = await Product.findOne({ title: params.title });
  if (existedProduct) throw 'Product title is existed.!';
  const mainCategory = await Category.findOne({ parentId: undefined });
  const newProduct = new Product(params);

  if (mainCategory) newProduct.category.unshift(mainCategory?._id);

  await newProduct.save();
  await db.disconnect();
};

const deleteProduct = async (id: string) => {
  await db.connect();
  const product = await Product.findById(id);
  if (!product) throw 'Product is not existed.!';
  await Product.findByIdAndDelete(id);
  await db.disconnect();
};

const updateProduct = async (params: IUpdateProductPayload) => {
  await db.connect();
  const product = await Product.findById(params.id);
  if (!product) throw 'Product is not existed.!';
  await Product.findByIdAndUpdate(params.id, params).lean();
  await db.disconnect();
};

const insertProducts = async (body: IInsertProductsPayload) => {
  await db.connect();
  await Product.deleteMany({});
  await Product.insertMany(body);
  await db.disconnect();
};

export const productRepository = {
  getOne,
  updateProduct,
  deleteProduct,
  createProduct,
  getAllProduct,
  insertProducts,
  getOneWithSimilarOnes,
};
