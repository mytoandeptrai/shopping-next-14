import { asyncHandler, responseHandler } from '@/helpers/api';
import { bannerRepository } from '@/models/repository';
import { NextRequest } from 'next/server';

import { forceUpdateBannerSchema } from '@/app/api/banner/force-update/schemaValidation';

const forceUpdateBannerHandler = asyncHandler(
  async (req: NextRequest) => {
    const body = await req.json();
    const result = await bannerRepository.insertBanners(body.data);
    const response = responseHandler({
      code: 200,
      message: 'Insert Banner successfully',
      data: result,
    });

    return response;
  },
  {
    isJwt: true,
    schema: forceUpdateBannerSchema,
  }
);

export const POST = forceUpdateBannerHandler;

export const dynamic = 'force-dynamic';
