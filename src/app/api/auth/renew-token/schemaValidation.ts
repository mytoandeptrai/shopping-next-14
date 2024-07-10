import Joi from 'joi';

export const renewTokenSchema = Joi.object({
  refreshToken: Joi.string().required(),
});
