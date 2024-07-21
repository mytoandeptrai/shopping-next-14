import { asyncHandler, responseHandler } from '@/helpers/api';
import { productRepository } from '@/models/repository/product.repository';
import { NextRequest } from 'next/server';

interface Params {
  id: string;
}

const getProductAndItsSimilarHandler = asyncHandler<Params>(async (req: NextRequest, context: { params: Params }) => {
  const _id = context.params?.id;

  const result = await productRepository.getOneWithSimilarOnes({ _id });
  const response = responseHandler({
    code: 200,
    message: 'Get product with its similar successfully',
    data: result,
  });

  return response;
}, {});

export const GET = getProductAndItsSimilarHandler;

export const dynamic = 'force-dynamic';
