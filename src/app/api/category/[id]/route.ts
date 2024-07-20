import { asyncHandler, responseHandler } from '@/helpers/api';
import { categoryRepository } from '@/models/repository/category.repository';
import { NextRequest } from 'next/server';

interface Params {
  id: string;
}

const getCategoryHandler = asyncHandler<Params>(async (req: NextRequest, context: { params: Params }) => {
  const _id = context.params?.id;

  const result = await categoryRepository.getOne({ _id });
  const response = responseHandler({
    code: 200,
    message: 'Get category successfully',
    data: result,
  });

  return response;
}, {});

export const GET = getCategoryHandler;

export const dynamic = 'force-dynamic';
