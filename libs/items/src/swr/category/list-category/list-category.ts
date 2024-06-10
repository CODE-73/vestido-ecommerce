import useSWRImmutable from 'swr/immutable';
import { ListCategorySWRKeys } from '../keys';
import { ListCategoryResponse } from './types';
import { getCategoriesList } from './service';
import { ListCategoryRequest } from '../../../services/categories/list-category/types';

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
    }
  );
}
