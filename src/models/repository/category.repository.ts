import { db } from '@/config';
import Category from '@/models/model/category.model';
import Product from '@/models/model/product.model';
import { ICategory } from '@/models/type';
import { FilterQuery } from 'mongoose';

import { generatePagination } from '@/lib/utils';

export interface IGetAllCategoryPayload extends FilterQuery<ICategory> {
  page_size?: number;
  page?: number;
}

interface ICreateCategoryPayload {
  name: string;
  slug: string;
  image: string;
  colors: object;
  level: number;
  parentId: string;
}

interface IUpdateCategoryPayload extends ICreateCategoryPayload {
  id: string;
}

type IInsertCategoriesPayload = IUpdateCategoryPayload[];

const getOne = async (filter: IGetAllCategoryPayload): Promise<ICategory | null> => {
  try {
    await db.connect();
    const categories = await Category.findOne(filter).lean().exec();
    await db.disconnect();
    return categories as ICategory;
  } catch {
    throw new Error('Category not found');
  }
};

const getAllCategory = async (filter: IGetAllCategoryPayload) => {
  const { page_size = 5, page = 1, ...rest } = filter;
  try {
    await db.connect();
    const CategoryData = Category.find(rest)
      .skip((page - 1) * page_size)
      .limit(page_size)
      .sort({
        createdAt: 'desc',
      })
      .populate('children')
      .exec();
    const CategoryCount = Category.countDocuments();
    const [category, categoryLength] = await Promise.all([CategoryData, CategoryCount]);
    const res = generatePagination(category, categoryLength, page, page_size);
    await db.disconnect();

    return res;
  } catch {
    throw new Error('Error Server');
  }
};

const createCategory = async (params: ICreateCategoryPayload) => {
  await db.connect();
  const category = await Category.findOne({ name: params.name });
  if (category) throw 'Category name is existed.!';
  const newCategory = new Category(params);
  await newCategory.save();
  await db.disconnect();
};

const deleteCategory = async (id: string) => {
  await db.connect();
  const category = await Category.findById(id);
  if (!category) throw 'Category is not existed.!';
  await Product.deleteMany({ category: { $in: [category._id] } });
  await Category.findByIdAndDelete(id);
  await db.disconnect();
};

const updateCategory = async (params: IUpdateCategoryPayload) => {
  await db.connect();
  const category = await Category.findById(params.id);
  if (!category) throw 'Category is not existed.!';
  await Category.findByIdAndUpdate(params.id, params).lean();
  await db.disconnect();
};

const rePublicCategory = async (id: string) => {
  await db.connect();
  const category = await Category.findById(id);
  if (!category) throw 'Category is not existed.!';
  await Category.findByIdAndUpdate(id, { public: !category.public }).lean();
  await db.disconnect();
};

const insertCategories = async (body: IInsertCategoriesPayload) => {
  await db.connect();
  await Category.deleteMany({});
  await Category.insertMany(body);
  await db.disconnect();
};

export const categoryRepository = {
  rePublicCategory,
  getOne,
  updateCategory,
  deleteCategory,
  createCategory,
  getAllCategory,
  insertCategories,
};
