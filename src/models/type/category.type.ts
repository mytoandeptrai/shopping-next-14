import { Document as MongooseDocument, Types } from 'mongoose';

export interface ICategory extends MongooseDocument {
  name: string;
  slug: string;
  parent?: Types.ObjectId;
  image: string;
  colors?: Record<string, any>;
  level: number;
  children?: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}
