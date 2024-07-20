import { ErrorHandlerError, errorHandler } from '@/helpers/api/error-handler.api';
import { identifyMiddleware, jwtAccessTokenMiddleware, validateMiddleware } from '@/helpers/middlewares';
import Joi from 'joi';
import { NextRequest, NextResponse } from 'next/server';

type AsyncRequestHandler<P> = (
  req: NextRequest,
  context: { params: P }
) => Promise<NextResponse | Record<string, any> | undefined>;

interface HandlerPayload {
  identifyVal?: string;
  isJwt?: boolean;
  schema?: Joi.ObjectSchema;
}

const publicPathsArray = ['POST:/api/auth/login', 'POST:/api/auth/register', 'POST:/api/auth/logout'];

const isPublicPath = (request: NextRequest) => {
  const url = `${request.method}:${request.nextUrl.pathname}`;
  return publicPathsArray.includes(url);
};

export const asyncHandler = <P>(handler: AsyncRequestHandler<P>, payload: HandlerPayload) => {
  return async (req: NextRequest, context: { params: P }) => {
    const { identifyVal, isJwt = false, schema } = payload;
    try {
      if (!isPublicPath(req)) {
        // Apply middleware logic only if the path is not public
        await jwtAccessTokenMiddleware({ req, isJwt });
        await identifyMiddleware(req, identifyVal, isJwt);
      }

      await validateMiddleware(req, schema);
      const responseBody = await handler(req, context);
      if (responseBody instanceof NextResponse) {
        return responseBody;
      }

      return NextResponse.json(responseBody);
    } catch (err) {
      // Handle errors globally
      return errorHandler(err as ErrorHandlerError);
    }
  };
};
