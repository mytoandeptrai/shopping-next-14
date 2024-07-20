import { db } from '@/config';
import Banner from '@/models/model/banner.model';
import { IBanner } from '@/models/type';
import { FilterQuery } from 'mongoose';

import { generatePagination } from '@/lib/utils';

export interface IGetAllBannerPayload extends FilterQuery<IBanner> {
  page_size?: number;
  page?: number;
}

interface ICreateBannerPayload {
  categoryId: string;
  image: {
    url: string;
  };
  isPublic: string;
  title: string;
  type: string;
  uri: string;
}

interface IUpdateBannerPayload extends ICreateBannerPayload {
  id: string;
}

type IInsertBannersPayload = IUpdateBannerPayload[];

const getOne = async (filter: IGetAllBannerPayload): Promise<IBanner | null> => {
  try {
    await db.connect();
    const banner = await Banner.findOne(filter).lean().exec();
    if (!banner) throw new Error('Banner not found');
    await db.disconnect();
    return banner as IBanner;
  } catch {
    throw new Error('Banner not found');
  }
};

const getAllBanner = async (filter: IGetAllBannerPayload) => {
  const { page_size = 5, page = 1, ...rest } = filter;
  try {
    await db.connect();
    const bannerData = Banner.find(rest)
      .skip((page - 1) * page_size)
      .limit(page_size)
      .sort({
        createdAt: 'desc',
      })
      .exec();
    const bannerCount = Banner.countDocuments();
    const [banners, bannerLength] = await Promise.all([bannerData, bannerCount]);
    const res = generatePagination(banners, bannerLength, page, page_size);
    await db.disconnect();

    return res;
  } catch {
    throw new Error('Error Server');
  }
};

const createBanner = async (params: ICreateBannerPayload) => {
  await db.connect();
  const banner = await Banner.findOne({ title: params.title });
  if (banner) throw 'Banner title is existed.!';
  const newBanner = new Banner(params);
  await newBanner.save();
  await db.disconnect();
};

const deleteBanner = async (id: string) => {
  await db.connect();
  const banner = await Banner.findById(id);
  if (!banner) throw 'Banner is not existed.!';
  await Banner.findByIdAndDelete(id);
  await db.disconnect();
};

const updateBanner = async (params: IUpdateBannerPayload) => {
  await db.connect();
  const banner = await Banner.findById(params.id);
  if (!banner) throw 'Banner is not existed.!';
  await Banner.findByIdAndUpdate(params.id, params).lean();
  await db.disconnect();
};

const rePublicBanner = async (id: string) => {
  await db.connect();
  const banner = await Banner.findById(id);
  if (!banner) throw 'Banner is not existed.!';
  await Banner.findByIdAndUpdate(id, { public: !banner.public }).lean();
  await db.disconnect();
};

const insertBanners = async (body: IInsertBannersPayload) => {
  await db.connect();
  await Banner.deleteMany({});
  await Banner.insertMany(body);
  await db.disconnect();
};

export const bannerRepository = {
  rePublicBanner,
  getOne,
  updateBanner,
  deleteBanner,
  createBanner,
  getAllBanner,
  insertBanners,
};
