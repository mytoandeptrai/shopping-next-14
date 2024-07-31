import { clientInstance } from '@/api/client-instance';
import { IProductListParams, IProductListResponse } from '@/api/product/types';

import { queryStringParser } from '@/lib/utils';

export const getProductListRequest = async (json: IProductListParams): Promise<IProductListResponse> => {
  const queryParams = queryStringParser(json);
  const response: IProductListResponse = await clientInstance.get(`api/product?${queryParams}`).json();

  return response;
};
