import useSWRImmutable from 'swr/immutable';
import { CategoryDetailsResponse } from '../../../services/categories/get-category/types';
import { getCategoryDetails } from './service';
import { CategoryDetailsSWRKeys } from '../keys';

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
    }
  );
}
