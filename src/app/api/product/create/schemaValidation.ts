import Joi from 'joi';

export const createProductSchema = Joi.object({
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
