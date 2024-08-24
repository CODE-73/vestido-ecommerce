import { FC } from 'react';

import {
  Category,
  categoryDetails,
  listCategories,
} from '@vestido-ecommerce/items';
import { slugify } from '@vestido-ecommerce/utils';

import ProductListView from '../../modules/ProductListView/ProductListView';

type CategorizedProductlistProps = {
  category: Category;
};

const CategorizedProductlist: FC<CategorizedProductlistProps> = ({
  category,
}) => {
  return <ProductListView category={category} />;
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

  return {
    props: {
      category: category,
    },
  };
}

export async function getStaticPaths() {
  const categories = await listCategories({});

  const slugs =
    categories?.flatMap((category) => [
      slugify(category.name),
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
