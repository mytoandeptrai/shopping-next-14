import baseModel from '@/models/model/base.model';
import { ISlider } from '@/models/type';
import mongoose, { Schema } from 'mongoose';

const SliderSchema = new mongoose.Schema<ISlider>(
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
  },
  { timestamps: true }
);

SliderSchema.plugin(baseModel);

const Slider = mongoose.models.Slider || mongoose.model('Slider', SliderSchema);

export default Slider;
