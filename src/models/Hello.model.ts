import { Schema, model, models } from 'mongoose';

const HelloSchema = new Schema(
  {
    msg: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const HelloModel = models.hello || model('hello', HelloSchema);

export default HelloModel;
