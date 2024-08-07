import { asyncHandler, responseHandler } from '@/helpers/api';
import { categoryRepository } from '@/models/repository/category.repository';
import { NextRequest } from 'next/server';

interface Params {
  id: string;
}
const deleteCategoryHandler = asyncHandler<Params>(
  async (req: NextRequest, context: { params: Params }) => {
    const { id } = context.params;

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
