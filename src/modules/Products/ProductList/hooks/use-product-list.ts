import { getProductListRequest } from '@/api/product/requests';
import useGetAllSearchParams from '@/hooks/useSearchParams';
import { useQuery } from '@tanstack/react-query';

export const useProductList = () => {
  const queryParams = useGetAllSearchParams();

  const params = {
    page: queryParams?.page || 1,
    category: queryParams?.category || '',
    search: queryParams?.search,
  };

  const { data, isLoading } = useQuery({
    queryKey: ['products', params],
    queryFn: () => getProductListRequest(params),
  });

  return { queryParams, data, isLoading };
};
