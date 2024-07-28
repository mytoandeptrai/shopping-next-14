import { env } from '@/config';
import { asyncHandler, responseHandler } from '@/helpers/api';
import { userRepository } from '@/models/repository';
import cookie from 'cookie';
import { NextRequest, NextResponse } from 'next/server';

import { loginSchema } from '@/app/api/auth/login/schemaValidation';

export const dynamic = 'force-dynamic';

const maxAge = 60 * 60 * 24 * 1;

const loginHandler = asyncHandler(
  async (req: NextRequest) => {
    const body = await req.json();
    const result = await userRepository.authenticateUser(body);
    const accessToken = result?.accessToken ?? '';

    const responsePayload = responseHandler({
      code: 200,
      message: 'Login success',
      data: result,
    });

    const response = new NextResponse(JSON.stringify(responsePayload), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    response.headers.set(
      'Set-Cookie',
      cookie.serialize(env.COOKIE_NAME_TOKEN, accessToken, {
        httpOnly: true /** only access by server */,
        secure: env.isProduction /** only send cookie to https when in development */,
        maxAge,
        sameSite: 'strict' /** Prevent CSRF */,
        path: '/' /** Allow all domains */,
      })
    );

    return response;
  },
  {
    schema: loginSchema,
  }
);

export const POST = loginHandler;
