import { asyncHandler, responseHandler } from '@/helpers/api';
import { bannerRepository } from '@/models/repository';
import { NextRequest } from 'next/server';

import { updateBannerSchema } from '@/app/api/banner/[id]/update/schemaValidation';

interface Params {
  id: string;
}

const updateBannerHandler = asyncHandler<Params>(
  async (req: NextRequest, context: { params: Params }) => {
    const { id } = context.params;
    const body = await req.json();
    const result = await bannerRepository.updateBanner({ ...body, id });
    const response = responseHandler({
      code: 200,
      message: 'Update Banner successfully',
      data: result,
    });

    return response;
  },
  {
    isJwt: true,
    schema: updateBannerSchema,
  }
);

export const PATCH = updateBannerHandler;

export const dynamic = 'force-dynamic';
