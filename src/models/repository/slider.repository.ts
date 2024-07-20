import { db } from '@/config';
import Slider from '@/models/model/slider.model';
import { ISlider } from '@/models/type';
import { FilterQuery } from 'mongoose';

import { generatePagination } from '@/lib/utils';

export interface IGetAllSliderPayload extends FilterQuery<ISlider> {
  page_size?: number;
  page?: number;
}

interface ICreateSliderPayload {
  categoryId: string;
  image: {
    url: string;
  };
  isPublic: string;
  title: string;
  uri: string;
}

interface IUpdateSliderPayload extends ICreateSliderPayload {
  id: string;
}

type IInsertSlidersPayload = IUpdateSliderPayload[];

const getOne = async (filter: IGetAllSliderPayload): Promise<ISlider | null> => {
  try {
    await db.connect();
    const slider = await Slider.findOne(filter).lean().exec();
    if (!slider) throw new Error('Slider not found');
    await db.disconnect();
    return slider as ISlider;
  } catch {
    throw new Error('Slider not found');
  }
};

const getAllSlider = async (filter: IGetAllSliderPayload) => {
  const { page_size = 5, page = 1, ...rest } = filter;
  try {
    await db.connect();
    const sliderData = Slider.find(rest)
      .skip((page - 1) * page_size)
      .limit(page_size)
      .sort({
        createdAt: 'desc',
      })
      .exec();
    const sliderCount = Slider.countDocuments();
    const [sliders, sliderLength] = await Promise.all([sliderData, sliderCount]);
    const res = generatePagination(sliders, sliderLength, page, page_size);
    await db.disconnect();

    return res;
  } catch {
    throw new Error('Error Server');
  }
};

const createSlider = async (params: ICreateSliderPayload) => {
  await db.connect();
  const slider = await Slider.findOne({ title: params.title });
  if (slider) throw 'Slider title is existed.!';
  const newSlider = new Slider(params);
  await newSlider.save();
  await db.disconnect();
};

const deleteSlider = async (id: string) => {
  await db.connect();
  const slider = await Slider.findById(id);
  if (!slider) throw 'Slider is not existed.!';
  await Slider.findByIdAndDelete(id);
  await db.disconnect();
};

const updateSlider = async (params: IUpdateSliderPayload) => {
  await db.connect();
  const slider = await Slider.findById(params.id);
  if (!slider) throw 'Slider is not existed.!';
  await Slider.findByIdAndUpdate(params.id, params).lean();
  await db.disconnect();
};

const rePublicSlider = async (id: string) => {
  await db.connect();
  const slider = await Slider.findById(id);
  if (!slider) throw 'Slider is not existed.!';
  await Slider.findByIdAndUpdate(id, { public: !slider.public }).lean();
  await db.disconnect();
};

const insertSliders = async (body: IInsertSlidersPayload) => {
  await db.connect();
  await Slider.deleteMany({});
  await Slider.insertMany(body);
  await db.disconnect();
};

export const sliderRepository = {
  rePublicSlider,
  getOne,
  updateSlider,
  deleteSlider,
  createSlider,
  getAllSlider,
  insertSliders,
};
