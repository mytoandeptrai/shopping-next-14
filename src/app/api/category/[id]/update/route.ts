import { asyncHandler, responseHandler } from '@/helpers/api';
import { categoryRepository } from '@/models/repository/category.repository';
import { NextRequest } from 'next/server';

import { updateCategorySchema } from './schemaValidation';

interface Params {
  id: string;
}

const updateCategoryHandler = asyncHandler<Params>(
  async (req: NextRequest, context: { params: Params }) => {
    const { id } = context.params;
    const body = await req.json();
    const result = await categoryRepository.updateCategory({ ...body, id });
    const response = responseHandler({
      code: 200,
      message: 'update category successfully',
      data: result,
    });

    return response;
  },
  {
    isJwt: true,
    schema: updateCategorySchema,
  }
);

export const PATCH = updateCategoryHandler;

export const dynamic = 'force-dynamic';
