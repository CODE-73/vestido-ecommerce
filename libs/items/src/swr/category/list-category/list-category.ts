import useSWRImmutable from 'swr/immutable';
import { ListCategorySWRKeys } from '../keys';
import { CategoryListResponse } from './types';
import { listCategories } from './service';

export function useCategories(query?: string) {
  const key = [ListCategorySWRKeys.CATEGORY, ListCategorySWRKeys.LIST, query];

  return useSWRImmutable<CategoryListResponse, Error>(
    key,
    () => listCategories(query),
    {
      keepPreviousData: true,
    }
  );
}
