import { asyncHandler, responseHandler } from '@/helpers/api';
import { IGetAllCategoryPayload, categoryRepository } from '@/models/repository/category.repository';
import { NextRequest } from 'next/server';

const getCategoryHandler = asyncHandler(async (req: NextRequest) => {
  const queryString = req.url.split('?')[1];
  const searchParams = new URLSearchParams(queryString);
  const id = String(searchParams.get('id'));
  const name = String(searchParams.get('name'));
  const query: IGetAllCategoryPayload = {};
  if (id) query['id'] = id;
  if (name) query['name'] = name;

  const result = await categoryRepository.getOne(query);
  const response = responseHandler({
    code: 200,
    message: 'Get category successfully',
    data: result,
  });

  return response;
}, {});

export const GET = getCategoryHandler;

export const dynamic = 'force-dynamic';
