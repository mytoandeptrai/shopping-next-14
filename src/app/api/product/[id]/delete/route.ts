import { asyncHandler, responseHandler } from '@/helpers/api';
import { productRepository } from '@/models/repository/product.repository';
import { NextRequest } from 'next/server';

interface Params {
  id: string;
}
const deleteProductHandler = asyncHandler<Params>(
  async (req: NextRequest, context: { params: Params }) => {
    const { id } = context.params;

    const result = await productRepository.deleteProduct(id);
    const response = responseHandler({
      code: 200,
      message: 'Delete product successfully',
      data: result,
    });

    return response;
  },
  {
    isJwt: true,
  }
);

export const DELETE = deleteProductHandler;

export const dynamic = 'force-dynamic';
