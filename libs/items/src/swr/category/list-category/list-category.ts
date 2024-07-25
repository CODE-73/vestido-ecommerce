import useSWRImmutable from 'swr/immutable';

import { ListCategoryRequest } from '../../../services/categories/list-category/types';
import { ListCategorySWRKeys } from '../keys';
import { getCategoriesList } from './service';
import { ListCategoryResponse } from './types';

export function useCategories(args?: ListCategoryRequest) {
  const key = [
    ListCategorySWRKeys.CATEGORY,
    ListCategorySWRKeys.LIST,
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
