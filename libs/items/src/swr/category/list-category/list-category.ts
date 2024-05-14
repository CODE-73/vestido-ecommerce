import useSWRImmutable from 'swr/immutable';
import { ListCategorySWRKeys } from '../keys';
import { CategoryListResponse } from './types';
import { getCategoriesList } from './service';

export function useCategories(query?: string) {
  const key = [ListCategorySWRKeys.CATEGORY, ListCategorySWRKeys.LIST, query];

  return useSWRImmutable<CategoryListResponse, Error>(
    key,
    () => getCategoriesList(query),
    {
      keepPreviousData: true,
    }
  );
}
