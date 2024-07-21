import { asyncHandler, responseHandler } from '@/helpers/api';
import { productRepository } from '@/models/repository/product.repository';
import { NextRequest } from 'next/server';

import { createProductSchema } from '@/app/api/product/create/schemaValidation';

const createProductHandler = asyncHandler(
  async (req: NextRequest) => {
    const body = await req.json();
    const result = await productRepository.createProduct(body);
    const response = responseHandler({
      code: 200,
      message: 'Create product successfully',
      data: result,
    });

    return response;
  },
  {
    isJwt: true,
    schema: createProductSchema,
  }
);

export const POST = createProductHandler;

export const dynamic = 'force-dynamic';
