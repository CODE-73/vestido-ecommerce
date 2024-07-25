import { useRouter } from 'next/router';

import { NextPage } from 'next';

import CategoryDetailsView from '../../modules/categories/CategoryForm';

const CategoryDetails: NextPage = () => {
  const router = useRouter();
  const categoryId = router.query.categoryName;

  return (
    <CategoryDetailsView
      isNew={categoryId === 'add-new'}
      categoryId={categoryId as string}
    />
  );
};

export default CategoryDetails;
