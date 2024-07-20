import { asyncHandler, responseHandler } from '@/helpers/api';
import { bannerRepository } from '@/models/repository';
import { NextRequest } from 'next/server';

interface Params {
  id: string;
}

const getBannerHandler = asyncHandler<Params>(async (req: NextRequest, context: { params: Params }) => {
  const _id = context.params?.id;

  const result = await bannerRepository.getOne({ _id });
  const response = responseHandler({
    code: 200,
    message: 'Get banner successfully',
    data: result,
  });

  return response;
}, {});

export const GET = getBannerHandler;

export const dynamic = 'force-dynamic';
