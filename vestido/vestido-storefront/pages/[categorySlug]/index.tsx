import * as React from 'react';
import { useRouter } from 'next/router';

import ProductlistView from '../../modules/ProductListView/ProductListView';

const CategorizedProductlist = () => {
  const router = useRouter();
  const categoryId = router.query.categorySlug as string;
  return <ProductlistView categoryId={categoryId} />;
};

export default CategorizedProductlist;
