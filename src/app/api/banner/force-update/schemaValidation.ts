import Joi from 'joi';

const createBannerSchema = Joi.object({
  categoryId: Joi.string().required(),
  image: Joi.object().required(),
  isPublic: Joi.boolean().required(),
  title: Joi.string().required(),
  type: Joi.string().required(),
  uri: Joi.string().required(),
});

export const forceUpdateBannerSchema = Joi.object({
  data: Joi.array().items(createBannerSchema).required(),
});
