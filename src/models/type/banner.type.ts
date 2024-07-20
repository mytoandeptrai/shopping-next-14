import { Document as MongooseDocument, Types } from 'mongoose';

export interface IBanner extends MongooseDocument {
  categoryId: Types.ObjectId;
  image: {
    url: string;
  };
  title: string;
  isPublic: boolean;
  type: string;
  uri?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
