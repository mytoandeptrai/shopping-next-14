import Joi from 'joi';

const createProductSchema = Joi.object({
  title: Joi.string().required(),
  price: Joi.number().required(),
  category: Joi.array().required(),
  images: Joi.array().required(),
  info: Joi.array().required(),
  specification: Joi.array().required(),
  inStock: Joi.number(),
  description: Joi.string().allow(''),
  discount: Joi.number(),
  sizes: Joi.array(),
  colors: Joi.array(),
  category_levels: Joi.object(),
});

export const forceUpdateProductSchema = Joi.object({
  data: Joi.array().items(createProductSchema).required(),
});
