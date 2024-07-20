import { asyncHandler, responseHandler } from '@/helpers/api';
import { bannerRepository } from '@/models/repository';
import { NextRequest } from 'next/server';

interface Params {
  id: string;
}

const deleteBannerHandler = asyncHandler<Params>(
  async (req: NextRequest, context: { params: Params }) => {
    const { id } = context.params;

    const result = await bannerRepository.deleteBanner(id);
    const response = responseHandler({
      code: 200,
      message: 'Delete Banner successfully',
      data: result,
    });

    return response;
  },
  {
    isJwt: true,
  }
);

export const DELETE = deleteBannerHandler;

export const dynamic = 'force-dynamic';
