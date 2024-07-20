import baseModel from '@/models/model/base.model';
import { ICategory } from '@/models/type';
import mongoose, { Schema, Types } from 'mongoose';

const CategorySchema = new mongoose.Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    parent: {
      type: Types.ObjectId,
      ref: 'Category',
    },
    image: {
      type: String,
      required: true,
    },
    colors: {
      type: Map,
      of: Schema.Types.Mixed,
    },
    level: {
      type: Number,
      required: true,
    },
    children: {
      type: [Types.ObjectId],
      ref: 'Category',
    },
  },
  { timestamps: true }
);

CategorySchema.plugin(baseModel);

CategorySchema.post(/^find/, function (docs) {
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

const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);

export default Category;
