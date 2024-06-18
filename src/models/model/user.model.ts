import baseModel from '@/models/model/base.model';
import { IUser } from '@/models/type/user.type';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
    root: { type: Boolean, default: false },
    address: {
      type: {
        postalCode: {
          type: String,
        },
        street: {
          type: String,
        },
        province: {
          code: {
            type: String,
          },
          name: {
            type: String,
          },
          name_with_type: {
            type: String,
          },
        },
        district: {
          code: {
            type: String,
          },
          name: {
            type: String,
          },
          provinceCode: {
            type: String,
          },
          name_with_type: {
            type: String,
          },
        },
        ward: {
          code: {
            type: String,
          },
          name: {
            type: String,
          },
          districtCode: {
            type: String,
          },
          name_with_type: {
            type: String,
          },
        },
      },
      required: false,
    },
    mobile: { type: String },
  },
  { timestamps: true }
);

UserSchema.plugin(baseModel);

UserSchema.index({ name: 'text', email: 'text' });

UserSchema.pre('save', async function (this: IUser, next: (err?: Error | undefined) => void) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(this.password, salt);
  this.password = hashPassword;

  next();
});

const User = mongoose.models.user || mongoose.model('user', UserSchema);

export default User;
