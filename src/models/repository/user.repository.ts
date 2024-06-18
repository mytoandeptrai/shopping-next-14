import { db } from '@/config';
import User from '@/models/model/user.model';
import { IUser } from '@/models/type';
import { FilterQuery } from 'mongoose';

import { generatePagination } from '@/lib/utils';

interface IGetAllUserPayload extends FilterQuery<IUser> {
  page_size?: number;
  page?: number;
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

export const userRepository = { getById, getOne, deleteById, getAllUser };
