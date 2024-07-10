import { db } from '@/config';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '@/helpers/jwt';
import User from '@/models/model/user.model';
import { IUser } from '@/models/type';
import bcrypt from 'bcryptjs';
import { FilterQuery, ObjectId } from 'mongoose';

import { generatePagination } from '@/lib/utils';

interface IGetAllUserPayload extends FilterQuery<IUser> {
  page_size?: number;
  page?: number;
}

interface ICreateUserPayload {
  name: string;
  email: string;
  password: string;
}

type IAuthenticateUserPayload = Pick<IUser, 'email' | 'password'>;

interface IReviewTokenPayload {
  refreshToken: string;
  userId: string;
}

const getById = async (id: string) => {
  try {
    await db.connect();
    const user = await User.findById(id);
    await db.disconnect();

    if (!user) throw 'User Not Found';

    return user;
  } catch {
    throw 'User Not Found';
  }
};

const getOne = async (filter: FilterQuery<IUser>): Promise<IUser | null> => {
  try {
    await db.connect();
    const user = await User.findOne(filter).lean().exec();
    await db.disconnect();
    return user as IUser;
  } catch {
    throw new Error('User not found');
  }
};

const deleteById = async (id: string) => {
  try {
    await db.connect();
    const user = await getById(id);
    await user.remove();
    await db.disconnect();
    return user;
  } catch {
    throw 'User Not Found';
  }
};

const getAllUser = async (filter: IGetAllUserPayload) => {
  const { page_size = 10, page = 1, ...rest } = filter;
  try {
    await db.connect();
    const usersData = User.find(rest)
      .select('-password')
      .skip((page - 1) * page_size)
      .limit(page_size)
      .sort({
        createdAt: 'desc',
      })
      .exec();
    const userCount = User.countDocuments();
    const [users, usersLength] = await Promise.all([usersData, userCount]);
    const res = generatePagination(users, usersLength, page, page_size);
    await db.disconnect();

    return res;
  } catch {
    throw new Error('Error Server');
  }
};

const createUser = async (payload: ICreateUserPayload) => {
  const { email } = payload;
  try {
    await db.connect();
    const existedUser = await getOne({ email });
    if (existedUser) {
      await db.disconnect();
      const errors = new Error('Email of ' + email + ' already exists');
      errors.name = 'UserExistedError';
      throw errors;
    }

    const newUser = new User(payload);
    await newUser.save();
    await db.disconnect();
    const token = await signAccessToken({
      _id: newUser._id,
    });

    return {
      user: {
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        root: newUser.root,
      },
      token,
    };
  } catch (error) {
    const message = (error as Error)?.message;
    throw new Error(message || 'Error Server');
  }
};

const authenticateUser = async (payload: IAuthenticateUserPayload) => {
  const { email, password } = payload;
  try {
    await db.connect();
    const user = await getOne({ email });
    if (!user) {
      await db.disconnect();
      throw new Error('User not found');
    }

    const isMatchPassword = await bcrypt.compare(password, user.password);
    if (!isMatchPassword) {
      throw new Error('Password is incorrect');
    }

    const accessToken = await signAccessToken({
      _id: user._id as unknown as ObjectId,
    });
    const refreshToken = await signRefreshToken({
      _id: user._id as unknown as ObjectId,
    });

    return {
      accessToken,
      refreshToken,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        root: user.root,
      },
    };
  } catch (error) {
    const message = (error as Error)?.message;
    throw new Error(message || 'Error Server');
  }
};

const renewToken = async (payload: IReviewTokenPayload) => {
  const { refreshToken, userId } = payload;
  try {
    const correctRefreshToken = await verifyRefreshToken(refreshToken);
    if (!correctRefreshToken) {
      throw new Error('Invalid refresh token');
    }

    const user = await getById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const newAccessToken = await signAccessToken({
      _id: user._id as unknown as ObjectId,
    });
    const newRefreshToken = await signRefreshToken({
      _id: user._id as unknown as ObjectId,
    });

    return {
      newAccessToken,
      newRefreshToken,
    };
  } catch (error) {
    const message = (error as Error)?.message;
    throw new Error(message || 'Error Server');
  }
};

export const userRepository = { getById, getOne, deleteById, getAllUser, createUser, authenticateUser, renewToken };
