import { IBaseAPIResponse, IPagination } from '@/types/common.type';

export interface IProductListParams {
  page: number | string;
  page_size?: string;
  sort?: string;
  category?: string;
  search?: string;
  inStock?: string;
  discount?: string;
  price?: string;
}

export interface IProductListResponse extends IBaseAPIResponse {
  data: {
    categories: Categories;
    hierarchyCategories: HierarchyCategories[];
  };
}

interface Categories {
  items: HierarchyCategories[];
  totalItems: number;
  pagination: IPagination;
}

interface HierarchyCategories {
  _id: string;
  name: string;
  slug: string;
  image: string;
  colors: Colors;
  level: number;
  children: HierarchyCategories[];
  __v: number;
  createdAt: string;
  updatedAt: string;
}

interface Colors {
  start: string;
  end: string;
}
