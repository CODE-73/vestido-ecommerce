import { FC } from 'react';

import { SWRConfig, unstable_serialize } from 'swr';

import {
  categoryDetails,
  listCategories,
  listItem,
} from '@vestido-ecommerce/items';
import {
  CategorySWRKeys,
  ListItemSWRKeys,
} from '@vestido-ecommerce/items/client';
import { slugify } from '@vestido-ecommerce/utils';

import ProductListView from '../../modules/ProductListView/ProductListView';

type CategorizedProductlistProps = {
  fallback: Record<string, unknown>;
  categoryId: string;
};

const CategorizedProductlist: FC<CategorizedProductlistProps> = ({
  fallback,
  categoryId,
}) => {
  return (
    <SWRConfig value={{ fallback }}>
      <ProductListView categoryId={categoryId} />;
    </SWRConfig>
  );
};

export async function getStaticProps({
  params,
}: {
  params: { categorySlug: string };
}) {
  const category = await categoryDetails(params.categorySlug);

  if (!category) {
    return {
      notFound: true,
    };
  }

  const items = await listItem({ categoryId: category.id });

  return {
    props: {
      fallback: {
        [unstable_serialize([
          CategorySWRKeys.CATEGORY,
          CategorySWRKeys.DETAILS,
          category.id,
        ])]: { data: category, success: true },
        [unstable_serialize([
          ListItemSWRKeys.ITEM,
          ListItemSWRKeys.LIST,
          JSON.stringify({ categoryId: category.id }),
        ])]: items,
      },
      categoryId: category.id,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const categories = await listCategories({});

  const slugs =
    categories?.flatMap((category) => [
      ...(category.slug ? [category.slug] : []),
      ...category.searchTerms.map((term) => slugify(term)),
    ]) ?? [];

  return {
    paths: slugs.map((slug) => ({
      params: { categorySlug: slug },
    })),
    fallback: 'blocking',
  };
}

export default CategorizedProductlist;
