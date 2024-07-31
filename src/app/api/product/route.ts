import { db } from '@/config';
import { asyncHandler, responseHandler } from '@/helpers/api';
import { productRepository } from '@/models/repository';
import { categoryRepository } from '@/models/repository/category.repository';
import { NextRequest } from 'next/server';

interface QueryParams {
  page?: string;
  page_size?: string;
  sort?: string;
  category?: string;
  search?: string;
  inStock?: string;
  discount?: string;
  price?: string;
}

interface Filters {
  [key: string]: any;
}

interface SortOrder {
  [key: string]: number;
}

const getCategoryFilter = async (category?: string): Promise<Filters> => {
  if (!category) return {};

  await db.connect();
  const currentCategory = await categoryRepository.getOne({ slug: category });
  await db.disconnect();

  return currentCategory && currentCategory?._id ? { category: { $in: currentCategory?._id.toString() } } : {};
};

const getSearchFilter = (search?: string): Filters => {
  return search ? { title: { $regex: search, $options: 'i' } } : {};
};

const getInStockFilter = (inStock?: string): Filters => {
  return inStock === 'true' ? { inStock: { $gte: 1 } } : {};
};

const getDiscountFilter = (discount?: string): Filters => {
  return discount === 'true' ? { discount: { $gte: 1 }, inStock: { $gte: 1 } } : {};
};

const getPriceFilter = (price?: string): Filters => {
  if (!price) return {};
  const [min, max] = price.split('-').map(Number);
  return {
    price: {
      $gte: min,
      $lte: max,
    },
  };
};

const getQueryFilters = async (query: QueryParams): Promise<Filters> => {
  return {
    categoryFilter: await getCategoryFilter(query.category),
    searchFilter: getSearchFilter(query.search),
    inStockFilter: getInStockFilter(query.inStock),
    discountFilter: getDiscountFilter(query.discount),
    priceFilter: getPriceFilter(query.price),
  };
};

const getSortOrder = (sort?: number): SortOrder => {
  switch (sort) {
    case 3:
      return { price: 1 };
    case 4:
      return { price: -1 };
    case 2:
      return { sold: -1 };
    case 1:
      return { createdAt: -1 };
    case 5:
      return { rating: -1 };
    case 6:
      return { discount: -1 };
    default:
      return { _id: -1 };
  }
};

const getProductsHandler = asyncHandler(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const query = Object.fromEntries(searchParams.entries());

  const page = query.page ? +query.page : 1;
  const page_size = query.page_size ? +query.page_size : 10;
  const sort = query.sort ? +query.sort : 1;

  const order = getSortOrder(sort);
  const { categoryFilter, searchFilter, inStockFilter, discountFilter, priceFilter } = await getQueryFilters(query);

  const data = await productRepository.getAllProduct({
    page,
    page_size,
    ...categoryFilter,
    ...searchFilter,
    ...inStockFilter,
    ...discountFilter,
    ...priceFilter,
    order,
  });

  const response = responseHandler({
    code: 200,
    message: 'Get list products successfully',
    data,
  });

  return response;
}, {});

export const GET = getProductsHandler;

export const dynamic = 'force-dynamic';
