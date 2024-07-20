import { Document as MongooseDocument, Types } from 'mongoose';

export interface ISlider extends MongooseDocument {
  categoryId: Types.ObjectId;
  image: {
    url: string;
  };
  title: string;
  isPublic: boolean;
  uri?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
