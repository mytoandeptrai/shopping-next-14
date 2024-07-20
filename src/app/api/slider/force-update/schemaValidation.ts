import Joi from 'joi';

const createSliderSchema = Joi.object({
  categoryId: Joi.string().required(),
  image: Joi.object().required(),
  isPublic: Joi.boolean().required(),
  title: Joi.string().required(),
  type: Joi.string().required(),
  uri: Joi.string().required(),
});

export const forceUpdateSliderSchema = Joi.object({
  data: Joi.array().items(createSliderSchema).required(),
});
