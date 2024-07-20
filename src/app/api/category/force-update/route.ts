import { asyncHandler, responseHandler } from '@/helpers/api';
import { categoryRepository } from '@/models/repository/category.repository';
import { NextRequest } from 'next/server';

import { forceUpdateCategorySchema } from '@/app/api/category/force-update/schemaValidation';

const forceUpdateCategoryHandler = asyncHandler(
  async (req: NextRequest) => {
    const body = await req.json();
    const result = await categoryRepository.insertCategories(body.data);
    const response = responseHandler({
      code: 200,
      message: 'Insert category successfully',
      data: result,
    });

    return response;
  },
  {
    isJwt: true,
    schema: forceUpdateCategorySchema,
  }
);

export const POST = forceUpdateCategoryHandler;

export const dynamic = 'force-dynamic';
