import { asyncHandler, responseHandler } from '@/helpers/api';
import { categoryRepository } from '@/models/repository/category.repository';
import { NextRequest } from 'next/server';

import { updateCategorySchema } from './schemaValidation';

const updateCategoryHandler = asyncHandler(
  async (req: NextRequest) => {
    const queryString = req.url.split('?')[1];
    const searchParams = new URLSearchParams(queryString);
    const id = String(searchParams.get('id'));
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
