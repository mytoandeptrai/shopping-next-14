import { asyncHandler, responseHandler } from '@/helpers/api';
import { categoryRepository } from '@/models/repository/category.repository';
import { NextRequest } from 'next/server';

import { createCategorySchema } from '@/app/api/category/create/schemaValidation';

const createCategoryHandler = asyncHandler(
  async (req: NextRequest) => {
    const body = await req.json();
    const result = await categoryRepository.createCategory(body);
    const response = responseHandler({
      code: 200,
      message: 'Create category successfully',
      data: result,
    });

    return response;
  },
  {
    isJwt: true,
    schema: createCategorySchema,
  }
);

export const POST = createCategoryHandler;

export const dynamic = 'force-dynamic';
