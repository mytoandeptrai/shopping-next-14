import { asyncHandler, responseHandler } from '@/helpers/api';
import { sliderRepository } from '@/models/repository';
import { NextRequest } from 'next/server';

import { updateSliderSchema } from '@/app/api/slider/[id]/update/schemaValidation';

interface Params {
  id: string;
}

const updateSliderHandler = asyncHandler<Params>(
  async (req: NextRequest, context: { params: Params }) => {
    const { id } = context.params;
    const body = await req.json();
    const result = await sliderRepository.updateSlider({ ...body, id });
    const response = responseHandler({
      code: 200,
      message: 'Update Slider successfully',
      data: result,
    });

    return response;
  },
  {
    isJwt: true,
    schema: updateSliderSchema,
  }
);

export const PATCH = updateSliderHandler;

export const dynamic = 'force-dynamic';
