import useSWRImmutable from 'swr/immutable';
import { ListCategorySWRKeys } from '../keys';
import { ListCategoriesResponse } from './types';
import { getCategoriesList } from './service';
import { ListCategoryRequest } from 'libs/items/src/services';

export function useCategories(args?: ListCategoryRequest) {
  const key = [
    ListCategorySWRKeys.CATEGORY,
    ListCategorySWRKeys.LIST,
    JSON.stringify(args ?? {}),
  ];

  return useSWRImmutable<ListCategoriesResponse, Error>(
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
