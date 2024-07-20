import { asyncHandler, responseHandler } from '@/helpers/api';
import { categoryRepository } from '@/models/repository/category.repository';
import { NextRequest } from 'next/server';

const deleteCategoryHandler = asyncHandler(
  async (req: NextRequest) => {
    const queryString = req.url.split('?')[1];
    const searchParams = new URLSearchParams(queryString);
    const id = String(searchParams.get('id'));

    const result = await categoryRepository.deleteCategory(id);
    const response = responseHandler({
      code: 200,
      message: 'Delete category successfully',
      data: result,
    });

    return response;
  },
  {
    isJwt: true,
  }
);

export const DELETE = deleteCategoryHandler;

export const dynamic = 'force-dynamic';
