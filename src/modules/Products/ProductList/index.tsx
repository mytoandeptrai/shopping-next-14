import dynamic from 'next/dynamic';

import { PageTitle } from '@/components/shared/ui';

const ProductListContainer = dynamic(() => import('./components/product-list-container'), {
  ssr: false,
});

const ProductList = () => {
  return (
    <section>
      <PageTitle title="Product list">
        <ProductListContainer />
      </PageTitle>
    </section>
  );
};

export default ProductList;
