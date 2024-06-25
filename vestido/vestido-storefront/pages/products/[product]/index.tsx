import { NextPage } from 'next';
import { useRouter } from 'next/router';
import ProductView from '../../../modules/ProductView/ProductView';

const ItemDetails: NextPage = () => {
  const router = useRouter();
  const itemId = router.query.product;

  return <ProductView itemId={itemId as string} />;
};

export default ItemDetails;
