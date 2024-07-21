import { asyncHandler, responseHandler } from '@/helpers/api';
import { productRepository } from '@/models/repository/product.repository';
import { NextRequest } from 'next/server';

import { updateProductSchema } from './schemaValidation';

interface Params {
  id: string;
}

const updateProductHandler = asyncHandler<Params>(
  async (req: NextRequest, context: { params: Params }) => {
    const { id } = context.params;
    const body = await req.json();
    const result = await productRepository.updateProduct({ ...body, id });
    const response = responseHandler({
      code: 200,
      message: 'update product successfully',
      data: result,
    });

    return response;
  },
  {
    isJwt: true,
    schema: updateProductSchema,
  }
);

export const PATCH = updateProductHandler;

export const dynamic = 'force-dynamic';
