import { responseHandler } from '@/helpers/api/response-handler.api';
import { NextResponse } from 'next/server';

export type ErrorHandlerError = string | Error | JsonWebTokenError | UserExistsError;

interface JsonWebTokenError extends Error {
  name: 'JsonWebTokenError';
}

interface UserExistsError extends Error {
  name: 'UserExistsError';
}

function errorHandler(err: ErrorHandlerError) {
  if (typeof err === 'string') {
    // custom application error
    const is404 = err.toLowerCase().endsWith('not found');
    const status = is404 ? 404 : 400;
    return NextResponse.json(
      responseHandler({
        message: err,
        code: status,
      }),
      { status }
    );
  }

  if (err.name === 'JsonWebTokenError') {
    return NextResponse.json(
      responseHandler({
        message: 'Unauthorized',
        code: 401,
      }),
      { status: 401 }
    );
  }

  if (err.name === 'UserExistsError') {
    return NextResponse.json(
      responseHandler({
        message: err.message,
        code: 422,
      }),
      { status: 422 }
    );
  }

  // default to 500 server error
  return NextResponse.json(
    responseHandler({
      message: err.message,
      code: 500,
    }),
    { status: 500 }
  );
}

export { errorHandler };
