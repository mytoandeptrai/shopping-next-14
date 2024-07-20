import { asyncHandler, responseHandler } from '@/helpers/api';
import { sliderRepository } from '@/models/repository';
import { NextRequest } from 'next/server';

const getSliderHandler = asyncHandler(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const query = Object.fromEntries(searchParams.entries());

  const sliders = await sliderRepository.getAllSlider(query);
  const response = responseHandler({
    code: 200,
    message: 'Get list sliders successfully',
    data: sliders,
  });

  return response;
}, {});

export const GET = getSliderHandler;

export const dynamic = 'force-dynamic';
