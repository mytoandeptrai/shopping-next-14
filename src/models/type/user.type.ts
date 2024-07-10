import { Document as MongooseDocument } from 'mongoose';

export interface IAddress {
  postalCode?: string;
  street?: string;
  province?: {
    code?: string;
    name?: string;
    name_with_type?: string;
  };
  district?: {
    code?: string;
    name?: string;
    provinceCode?: string;
    name_with_type?: string;
  };
  ward?: {
    code?: string;
    name?: string;
    districtCode?: string;
    name_with_type?: string;
  };
}

export interface IUser extends MongooseDocument {
  _id: string;
  name: string;
  email: string;
  password: string;
  role?: string;
  root?: boolean;
  address?: IAddress;
  mobile?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
