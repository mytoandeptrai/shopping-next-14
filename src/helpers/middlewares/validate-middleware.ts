import Joi from 'joi';
import { NextRequest } from 'next/server';

interface ValidateRequest extends NextRequest {
  json: () => Promise<any>;
}

async function validateMiddleware(req: ValidateRequest, schema?: Joi.ObjectSchema) {
  if (!schema) return;

  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };

  const body = await req.json();
  const { error, value } = schema.validate(body, options);

  if (error) {
    throw new Error(`Validation error: ${error.details.map((x) => x.message).join(', ')}`);
  }

  req.json = () => Promise.resolve(value);
}

export { validateMiddleware };
