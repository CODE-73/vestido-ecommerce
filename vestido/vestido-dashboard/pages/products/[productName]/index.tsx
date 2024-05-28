import { NextPage } from 'next';
import { useRouter } from 'next/router';
import ProductDetailsView from '../../../modules/products/ProductForm';

const ItemDetails: NextPage = () => {
  const router = useRouter();
  const itemId = router.query.productName;

  return (
    <ProductDetailsView
      isNew={itemId === 'add-new'}
      itemId={itemId as string}
    />
  );
};

export default ItemDetails;
