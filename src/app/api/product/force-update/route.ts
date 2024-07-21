import { asyncHandler, responseHandler } from '@/helpers/api';
import { productRepository } from '@/models/repository/product.repository';
import { NextRequest } from 'next/server';

import { forceUpdateProductSchema } from '@/app/api/product/force-update/schemaValidation';

const forceUpdateProductHandler = asyncHandler(
  async (req: NextRequest) => {
    const body = await req.json();
    const result = await productRepository.insertProducts(body.data);
    const response = responseHandler({
      code: 200,
      message: 'Insert product successfully',
      data: result,
    });

    return response;
  },
  {
    isJwt: true,
    schema: forceUpdateProductSchema,
  }
);

export const POST = forceUpdateProductHandler;

export const dynamic = 'force-dynamic';
