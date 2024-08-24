import useSWRImmutable from 'swr/immutable';

import { CategoryDetailsResponse } from '../../../services/categories/get-category/types';
import { CategorySWRKeys } from '../keys';
import { getCategoryDetails } from './service';

export function useCategory(categoryId?: string | null) {
  const key = categoryId
    ? [CategorySWRKeys.CATEGORY, CategorySWRKeys.DETAILS, categoryId]
    : null;

  return useSWRImmutable<CategoryDetailsResponse, Error>(
    key,
    () => getCategoryDetails(categoryId as string),
    {
      keepPreviousData: true,
    },
  );
}
