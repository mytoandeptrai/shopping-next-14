import { Schema } from 'mongoose';

const baseModel = (schema: Schema): void => {
  schema.set('toJSON', { getters: true, virtuals: false });
  schema.set('toObject', { getters: true });
};

export default baseModel;
