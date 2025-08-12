import { FC } from 'react';

import { SWRConfig, unstable_serialize } from 'swr';

import { listItem } from '@vestido-ecommerce/items';
import { ListItemSWRKeys } from '@vestido-ecommerce/items/client';
import { ensureSerializable } from '@vestido-ecommerce/utils';

import ProductListView from '../../modules/ProductListView/ProductListView';

type AllProductsPageProps = {
  fallback: Record<string, unknown>;
};

const AllProductsPage: FC<AllProductsPageProps> = ({ fallback }) => {
  return (
    <SWRConfig value={{ fallback }}>
      <ProductListView />;
    </SWRConfig>
  );
};

export async function getStaticProps() {
  const defaultQuery = { limit: 50, offset: 0 };
  const items = ensureSerializable(await listItem(defaultQuery));

  return {
    props: {
      fallback: {
        // useItems({ })
        [unstable_serialize([
          ListItemSWRKeys.ITEM,
          ListItemSWRKeys.LIST,
          JSON.stringify(defaultQuery),
        ])]: items,
      },
    },
    revalidate: 10,
  };
}

export default AllProductsPage;
