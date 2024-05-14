import { NextPage } from 'next';
import { useRouter } from 'next/router';
import CategoryDetailsView from '../../modules/categories/CategoryForm';

const CategoryDetails: NextPage = () => {
  const router = useRouter();
  console.log(router.query.categoryName);

  return (
    <CategoryDetailsView
      isNew={false}
      categoryId={router.query.categoryName as string}
    />
  );
};

export default CategoryDetails;
