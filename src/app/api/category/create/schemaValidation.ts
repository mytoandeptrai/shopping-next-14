import Joi from 'joi';

export const createCategorySchema = Joi.object({
  name: Joi.string().required(),
  slug: Joi.string().required(),
  image: Joi.string().required(),
  colors: Joi.object().required(),
  level: Joi.number().required(),
  parentId: Joi.string().allow('').optional(),
});
