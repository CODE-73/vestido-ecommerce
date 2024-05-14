import useSWRImmutable from 'swr/immutable';
import { CategoryDetailsResponse } from '../../../services/get-category/types';
import { getCategoryDetails } from './service';
import { CategoryDetailsSWRKeys } from '../keys';

export function useCategory(categoryId: string) {
  const key = [
    CategoryDetailsSWRKeys.CATEGORY,
    CategoryDetailsSWRKeys.DETAILS,
    categoryId,
  ];

  return useSWRImmutable<CategoryDetailsResponse, Error>(
    key,
    () => getCategoryDetails(categoryId),
    {
      keepPreviousData: true,
    }
  );
}
