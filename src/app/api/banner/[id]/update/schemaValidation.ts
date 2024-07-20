import Joi from 'joi';

export const updateBannerSchema = Joi.object({
  categoryId: Joi.string().required(),
  image: Joi.object().required(),
  isPublic: Joi.boolean().required(),
  title: Joi.string().required(),
  type: Joi.string().required(),
  uri: Joi.string().required(),
});
