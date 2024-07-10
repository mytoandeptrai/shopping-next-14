import { env } from '@/config';
import { asyncHandler, responseHandler } from '@/helpers/api';
import cookie from 'cookie';
import { NextResponse } from 'next/server';

const logoutHandler = asyncHandler(async () => {
  const responsePayload = responseHandler({
    code: 200,
    message: 'Logout successfully!',
    data: {},
  });

  const response = new NextResponse(JSON.stringify(responsePayload), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  response.headers.set(
    'Set-Cookie',
    cookie.serialize(env.COOKIE_NAME_TOKEN, '', {
      httpOnly: true,
      secure: env.isProduction,
      expires: new Date(0),
      sameSite: 'strict',
      path: '/',
    })
  );

  return response;
}, {});

export const POST = logoutHandler;
