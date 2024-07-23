import * as React from 'react';
import ProductlistView from '../../modules/ProductListView/ProductListView';
import { useRouter } from 'next/router';

const CategorizedProductlist = () => {
  const router = useRouter();
  const categoryId = router.query.categorySlug as string;
  console.log('category id from page', categoryId);
  return <ProductlistView categoryId={categoryId} />;
};

export default CategorizedProductlist;
