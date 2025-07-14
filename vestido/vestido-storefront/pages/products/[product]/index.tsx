import Head from 'next/head';

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
import { ensureSerializable, ImageSchemaType } from '@vestido-ecommerce/utils';

import ProductView from '../../../modules/products/product-view';

type ItemDetailsPageProps = {
  fallback: Record<string, unknown>;
  itemId: string;
  item: Awaited<ReturnType<typeof getItemDetails>>;
};

const ItemDetails: NextPage<ItemDetailsPageProps> = ({
  itemId,
  item,
  fallback,
}) => {
  const imageUrl =
    ((item.images as ImageSchemaType[]) ?? []).find((img) => img.default)
      ?.url ||
    (item.images as ImageSchemaType[])?.[0]?.url ||
    `https://beta.vestidonation.com/fallback-image.png`;

  const itemUrl = `https://beta.vestidonation.com/products/${item.slug}`;

  return (
    <>
      <Head>
        <title>{item.title} | Vestido Nation</title>
        <meta property="og:title" content={item.title} />
        <meta
          property="og:description"
          content="Discover premium fashion from Vestido Nation."
        />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={itemUrl} />
        <meta property="og:type" content="product" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={item.title} />
        <meta
          name="twitter:description"
          content="Discover premium fashion from Vestido Nation."
        />
        <meta name="twitter:image" content={imageUrl} />
      </Head>
      <SWRConfig value={{ fallback }}>
        <ProductView itemId={itemId} />
      </SWRConfig>
    </>
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
  const item = ensureSerializable(await getItemDetails(itemId));
  if (!item) {
    return {
      notFound: true,
    };
  }

  const category = ensureSerializable(await categoryDetails(item.categoryId));
  if (!category) {
    throw new Error('Category does not exist');
  }

  const items = ensureSerializable(await listItem({ categoryId: category.id }));

  return {
    props: {
      itemId,
      item,
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
