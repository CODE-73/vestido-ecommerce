import { NextPage } from 'next';
import { useRouter } from 'next/router';
import ProductDetailsView from '../../../modules/products/ProductForm';

const ItemDetails: NextPage = () => {
  const router = useRouter();
  const itemId = router.query.productName;

  const isNew = itemId === 'add-new';

  return (
    <ProductDetailsView
      isNew={isNew}
      itemId={isNew ? null : (itemId as string)}
    />
  );
};

export default ItemDetails;
