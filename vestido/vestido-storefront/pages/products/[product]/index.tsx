import { NextPage } from 'next';
import { SWRConfig, unstable_serialize } from 'swr';

import {
  categoryDetails,
  getItemDetails,
  listItem,
} from '@vestido-ecommerce/items';
import {
  CategorySWRKeys,
  ItemDetailsSWRKeys,
  ListItemSWRKeys,
} from '@vestido-ecommerce/items/client';

import ProductView from '../../../modules/products/product-view';

type ItemDetailsPageProps = {
  fallback: Record<string, unknown>;
  itemId: string;
};

const ItemDetails: NextPage<ItemDetailsPageProps> = ({ itemId, fallback }) => {
  return (
    <SWRConfig value={{ fallback }}>
      <ProductView itemId={itemId} />
    </SWRConfig>
  );
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
  const itemId = params.product;
  const item = await getItemDetails(itemId);
  if (!item) {
    return {
      notFound: true,
    };
  }

  const category = await categoryDetails(item.categoryId);
  if (!category) {
    throw new Error('Category does not exist');
  }

  const items = await listItem({ categoryId: category.id });

  return {
    props: {
      itemId,
      fallback: {
        // useItem()
        [unstable_serialize([
          ItemDetailsSWRKeys.ITEM,
          ItemDetailsSWRKeys.DETAILS,
          itemId,
        ])]: { data: item, success: true },
        // useCategory()
        [unstable_serialize([
          CategorySWRKeys.CATEGORY,
          CategorySWRKeys.DETAILS,
          category.id,
        ])]: { data: category, success: true },
        // useItems({ categoryId: category.id })
        [unstable_serialize([
          ListItemSWRKeys.ITEM,
          ListItemSWRKeys.LIST,
          JSON.stringify({ categoryId: category.id }),
        ])]: items,
      },
    },
    revalidate: 30,
  };
}
