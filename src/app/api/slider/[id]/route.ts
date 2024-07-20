import { asyncHandler, responseHandler } from '@/helpers/api';
import { sliderRepository } from '@/models/repository';
import { NextRequest } from 'next/server';

interface Params {
  id: string;
}

const getSliderHandler = asyncHandler<Params>(async (req: NextRequest, context: { params: Params }) => {
  const _id = context.params?.id;

  const result = await sliderRepository.getOne({ _id });
  const response = responseHandler({
    code: 200,
    message: 'Get slider successfully',
    data: result,
  });

  return response;
}, {});

export const GET = getSliderHandler;

export const dynamic = 'force-dynamic';
