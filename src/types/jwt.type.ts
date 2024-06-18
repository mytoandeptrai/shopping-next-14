import { ObjectId } from 'mongoose';

export interface JWTPayload {
  username: string;
  _id: ObjectId;
}
