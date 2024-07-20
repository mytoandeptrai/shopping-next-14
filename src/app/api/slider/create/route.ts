import { asyncHandler, responseHandler } from '@/helpers/api';
import { sliderRepository } from '@/models/repository/slider.repository';
import { NextRequest } from 'next/server';

import { createSliderSchema } from '@/app/api/slider/create/schemaValidation';

const createSliderHandler = asyncHandler(
  async (req: NextRequest) => {
    const body = await req.json();
    const result = await sliderRepository.createSlider(body);
    const response = responseHandler({
      code: 200,
      message: 'Create slider successfully',
      data: result,
    });

    return response;
  },
  {
    isJwt: true,
    schema: createSliderSchema,
  }
);

export const POST = createSliderHandler;

export const dynamic = 'force-dynamic';
