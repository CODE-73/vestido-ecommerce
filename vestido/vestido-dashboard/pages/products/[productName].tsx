import { NextPage } from 'next';
import { useRouter } from 'next/router';
import ProductDetailsView from '../../modules/products/ProductForm';

const ItemDetails: NextPage = () => {
  const router = useRouter();

  return (
    <ProductDetailsView
      isNew={false}
      itemId={router.query.productName as string}
    />
  );
};

export default ItemDetails;
