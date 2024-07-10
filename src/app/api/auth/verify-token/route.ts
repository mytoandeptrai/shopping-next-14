import { asyncHandler, responseHandler } from '@/helpers/api';

export const dynamic = 'force-dynamic';

const verifyTokenHandler = asyncHandler(async (req: Request) => {
  const response = responseHandler({
    code: 200,
    message: 'OK',
    data: {},
  });

  return response;
}, {});

export const POST = verifyTokenHandler;
