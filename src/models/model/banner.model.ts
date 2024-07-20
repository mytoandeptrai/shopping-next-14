import baseModel from '@/models/model/base.model';
import { IBanner } from '@/models/type';
import mongoose, { Schema } from 'mongoose';

const BannerSchema = new mongoose.Schema<IBanner>(
  {
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    image: {
      url: {
        type: String,
        required: true,
      },
    },
    title: {
      type: String,
      required: true,
    },
    uri: {
      type: String,
      required: false,
    },
    isPublic: {
      type: Boolean,
      required: true,
      default: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

BannerSchema.plugin(baseModel);

const Banner = mongoose.models.Banner || mongoose.model('Banner', BannerSchema);

export default Banner;
