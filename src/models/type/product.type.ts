import { Document as MongooseDocument, Types } from 'mongoose';

export interface IImage {
  url: string;
}

export interface ISize {
  id: string;
  size: string;
}

export interface IColor {
  id: string;
  name: string;
  hashCode: string;
}

export interface IInfo {
  title: string;
  value?: string;
}

export interface ISpecification {
  title: string;
  value?: string;
}

export interface ICategoryLevel {
  level_one?: Types.ObjectId;
  level_two?: Types.ObjectId;
  level_three?: Types.ObjectId;
}

export interface IProduct extends MongooseDocument {
  title: string;
  price: number;
  description?: string;
  discount?: number;
  images: IImage[];
  sizes: ISize[];
  colors: IColor[];
  category: string[];
  category_levels: ICategoryLevel;
  inStock?: number;
  sold?: number;
  info: IInfo[];
  specification: ISpecification[];
  rating?: number;
  numReviews?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
