import { asyncHandler, responseHandler } from '@/helpers/api';
import { bannerRepository } from '@/models/repository/banner.repository';
import { NextRequest } from 'next/server';

import { createBannerSchema } from '@/app/api/banner/create/schemaValidation';

const createBannerHandler = asyncHandler(
  async (req: NextRequest) => {
    const body = await req.json();
    const result = await bannerRepository.createBanner(body);
    const response = responseHandler({
      code: 200,
      message: 'Create banner successfully',
      data: result,
    });

    return response;
  },
  {
    isJwt: true,
    schema: createBannerSchema,
  }
);

export const POST = createBannerHandler;

export const dynamic = 'force-dynamic';
