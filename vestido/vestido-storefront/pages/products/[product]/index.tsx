import Head from 'next/head';

import { Item } from '@prisma/client'; // Import the Item type
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
import { ensureSerializable } from '@vestido-ecommerce/utils';

import ProductView from '../../../modules/products/product-view';

// Define the type for the SWR response
type SWRResponse<T> = {
  data: T;
  success: boolean;
};

// Update the props type to use the SWRResponse type
type ItemDetailsPageProps = {
  fallback: Record<
    string,
    | SWRResponse<Item> // For useItem()
    | SWRResponse<{ id: string; name: string }> // For useCategory() - Adjust based on your category type
    | Item[] // For useItems()
  >;
  itemId: string;
};

const ItemDetails: NextPage<ItemDetailsPageProps> = ({ itemId, fallback }) => {
  // Access the item data with proper typing
  const itemResponse = fallback[
    unstable_serialize([
      ItemDetailsSWRKeys.ITEM,
      ItemDetailsSWRKeys.DETAILS,
      itemId,
    ])
  ] as SWRResponse<Item> | undefined;

  const item = itemResponse?.data;

  if (!item) {
    return null; // Or a fallback UI if item is not found
  }
  const domain = process.env.NEXT_PUBLIC_DOMAIN || 'http://localhost:4200';

  const pageTitle = `Vestido Nation - ${item.title}`;
  const pageDescription = 'Discover this amazing item on Vestido Nation!';
  const pageUrl = `${domain}/products/${itemId}`;
  const logoUrl = `${domain}/assets/vn-logo-white.png`; // Replace with your logo URL

  return (
    <>
      <Head>
        {/* Standard Meta Tags */}
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />

        {/* Open Graph Meta Tags for WhatsApp/Share Previews */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={logoUrl} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" />
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
