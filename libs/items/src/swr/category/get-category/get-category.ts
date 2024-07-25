import useSWRImmutable from 'swr/immutable';

import { CategoryDetailsResponse } from '../../../services/categories/get-category/types';
import { CategoryDetailsSWRKeys } from '../keys';
import { getCategoryDetails } from './service';

export function useCategory(categoryId?: string | null) {
  const key = categoryId
    ? [
        CategoryDetailsSWRKeys.CATEGORY,
        CategoryDetailsSWRKeys.DETAILS,
        categoryId,
      ]
    : null;

  return useSWRImmutable<CategoryDetailsResponse, Error>(
    key,
    () => getCategoryDetails(categoryId as string),
    {
      keepPreviousData: true,
    },
  );
}
