import Joi from 'joi';

export const createBannerSchema = Joi.object({
  category_id: Joi.string().required(),
  image: Joi.string().required(),
  isPublic: Joi.boolean().required(),
  title: Joi.string().required(),
  type: Joi.string().required(),
  uri: Joi.string().required(),
});
