import { NextPage } from 'next';

import {
  itemDetails,
  ItemDetailsResponse,
  listItem,
} from '@vestido-ecommerce/items';

import ProductView from '../../../modules/ProductView/ProductView';

type ItemDetailsPageProps = {
  product: NonNullable<ItemDetailsResponse['data']>;
};

const ItemDetails: NextPage<ItemDetailsPageProps> = ({ product }) => {
  return <ProductView item={product} />;
};

export default ItemDetails;

export async function getStaticPaths() {
  const items = await listItem(null);

  const paths = items.map((item) => ({
    params: { product: item.id },
  }));

  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({
  params,
}: {
  params: { product: string };
}) {
  const product = await itemDetails(params.product);

  return { props: { product }, revalidate: 30 };
}
