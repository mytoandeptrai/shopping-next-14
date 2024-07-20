import { asyncHandler, responseHandler } from '@/helpers/api';
import { sliderRepository } from '@/models/repository';
import { NextRequest } from 'next/server';

interface Params {
  id: string;
}

const deleteSliderHandler = asyncHandler<Params>(
  async (req: NextRequest, context: { params: Params }) => {
    const { id } = context.params;

    const result = await sliderRepository.deleteSlider(id);
    const response = responseHandler({
      code: 200,
      message: 'Delete Slider successfully',
      data: result,
    });

    return response;
  },
  {
    isJwt: true,
  }
);

export const DELETE = deleteSliderHandler;

export const dynamic = 'force-dynamic';
