'use client';

import { useProductList } from '@/modules/Products/ProductList/hooks';

const ProductListContainer = () => {
  const { data } = useProductList();
  return <div>ProductListContainer</div>;
};

export default ProductListContainer;
