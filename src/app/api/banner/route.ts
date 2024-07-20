import { asyncHandler, responseHandler } from '@/helpers/api';
import { bannerRepository } from '@/models/repository';
import { NextRequest } from 'next/server';

const getBannerHandler = asyncHandler(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const query = Object.fromEntries(searchParams.entries());

  const banners = await bannerRepository.getAllBanner(query);
  const response = responseHandler({
    code: 200,
    message: 'Get list banners successfully',
    data: banners,
  });

  return response;
}, {});

export const GET = getBannerHandler;

export const dynamic = 'force-dynamic';
