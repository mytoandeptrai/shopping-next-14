import { asyncHandler, responseHandler } from '@/helpers/api';
import { userRepository } from '@/models/repository';

import { registerSchema } from '@/app/api/auth/register/schemaValidation';

export const dynamic = 'force-dynamic';

const registerHandler = asyncHandler(
  async (req: Request) => {
    const body = await req.json();
    const result = await userRepository.createUser(body);

    const response = responseHandler({
      code: 200,
      message: 'Register success',
      data: result,
    });

    return response;
  },
  {
    schema: registerSchema,
  }
);

export const POST = registerHandler;
