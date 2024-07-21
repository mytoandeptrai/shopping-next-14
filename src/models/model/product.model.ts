import baseModel from '@/models/model/base.model';
import { IProduct } from '@/models/type';
import mongoose, { Types } from 'mongoose';

const ProductSchema = new mongoose.Schema<IProduct>(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    discount: { type: Number, default: 0 },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
      },
    ],
    sizes: [
      {
        id: { type: String, required: true },
        size: { type: String, required: true },
      },
    ],
    colors: [
      {
        id: { type: String, required: true },
        name: { type: String, required: true },
        hashCode: { type: String, required: true },
      },
    ],
    category: [{ type: String, required: true }],
    category_levels: {
      level_one: {
        type: Types.ObjectId,
        ref: 'Category',
      },
      level_two: {
        type: Types.ObjectId,
        ref: 'Category',
      },
      level_three: {
        type: Types.ObjectId,
        ref: 'Category',
      },
    },
    inStock: {
      type: Number,
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
    },
    info: [
      {
        title: { type: String, required: true },
        value: { type: String, required: false },
      },
    ],
    specification: [
      {
        title: { type: String, required: true },
        value: { type: String, required: false },
      },
    ],
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

ProductSchema.plugin(baseModel);

ProductSchema.post(/^find/, function (docs) {
  // if (this.op === 'find') {
  //   docs.forEach((doc) => {
  //     doc._id = doc._id.toString();
  //     doc.parent = doc.parent ? doc.parent.toString() : doc.parent;
  //   });
  // }
  // if (this.op === 'findOne' && docs) {
  //   docs._id = docs._id.toString();
  //   docs.parent = docs.parent ? docs.parent.toString() : docs.parent;
  // }
});

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

export default Product;
