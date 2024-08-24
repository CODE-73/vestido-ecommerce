import useSWRImmutable from 'swr/immutable';

import { ListCategoryRequest } from '../../../services/categories/list-category/types';
import { CategorySWRKeys } from '../keys';
import { getCategoriesList } from './service';
import { ListCategoryResponse } from './types';

export function useCategories(args?: ListCategoryRequest) {
  const key = [
    CategorySWRKeys.CATEGORY,
    CategorySWRKeys.LIST,
    JSON.stringify(args ?? {}),
  ];

  return useSWRImmutable<ListCategoryResponse, Error>(
    key,
    () =>
      getCategoriesList({
        ...(args ?? {}),
      }),
    {
      keepPreviousData: true,
    },
  );
}
