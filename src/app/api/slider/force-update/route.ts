import { asyncHandler, responseHandler } from '@/helpers/api';
import { sliderRepository } from '@/models/repository';
import { NextRequest } from 'next/server';

import { forceUpdateSliderSchema } from '@/app/api/slider/force-update/schemaValidation';

const forceUpdateSliderHandler = asyncHandler(
  async (req: NextRequest) => {
    const body = await req.json();
    const result = await sliderRepository.insertSliders(body.data);
    const response = responseHandler({
      code: 200,
      message: 'Insert Slider successfully',
      data: result,
    });

    return response;
  },
  {
    isJwt: true,
    schema: forceUpdateSliderSchema,
  }
);

export const POST = forceUpdateSliderHandler;

export const dynamic = 'force-dynamic';
