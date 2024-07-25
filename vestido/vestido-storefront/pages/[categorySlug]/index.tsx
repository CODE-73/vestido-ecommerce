import * as React from 'react';
import { useRouter } from 'next/router';

import ProductlistView from '../../modules/ProductListView/ProductListView';

const CategorizedProductlist = () => {
  const router = useRouter();
  const categoryId = router.query.categorySlug as string;
  console.log('category id from page', categoryId);
  return <ProductlistView categoryId={categoryId} />;
};

export default CategorizedProductlist;
