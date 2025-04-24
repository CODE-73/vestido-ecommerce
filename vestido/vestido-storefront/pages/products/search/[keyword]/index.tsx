import { FC } from 'react';

import { SWRConfig, unstable_serialize } from 'swr';

import { listItem, ListItemRequest } from '@vestido-ecommerce/items';
import { ListItemSWRKeys } from '@vestido-ecommerce/items/client';
import { ensureSerializable } from '@vestido-ecommerce/utils';

import ProductByGenderView from '../../../../modules/ProductListView/product-by-gender';

type ProductsByGenderProps = {
  fallback: Record<string, unknown>;
  gender: string;
};

const ProductsByGenderPage: FC<ProductsByGenderProps> = ({
  fallback,
  gender,
}) => {
  return (
    <SWRConfig value={{ fallback }}>
      <ProductByGenderView gender={gender} />
    </SWRConfig>
  );
};

export async function getStaticProps({
  params,
}: {
  params: { keyword: string };
}) {
  const keyword = params.keyword.toLowerCase().trim();
  const listItemFilter: ListItemRequest = {};

  // Validate gender to prevent invalid requests
  const validGenders = ['men', 'women', 'unisex'];
  if (validGenders.includes(keyword)) {
    listItemFilter.gender = keyword;
  } else {
    listItemFilter.q = keyword;
  }

  // Fetch items filtered by gender or query
  const items = ensureSerializable(await listItem(listItemFilter));

  return {
    props: {
      fallback: {
        [unstable_serialize([
          ListItemSWRKeys.ITEM,
          ListItemSWRKeys.LIST,
          JSON.stringify(listItemFilter),
        ])]: items,
      },
      gender: keyword,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  // Define the possible gender values for pre-rendering
  const genders = ['men', 'women', 'unisex'];

  return {
    paths: genders.map((keyword) => ({
      params: { keyword },
    })),
    fallback: 'blocking', // Allow dynamic keywords to be handled at request time
  };
}

export default ProductsByGenderPage;
