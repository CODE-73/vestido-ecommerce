import useSWRImmutable from 'swr/immutable';

import { useAuth } from '@vestido-ecommerce/auth/client';

import { ListCategoryRequest } from '../../../services/categories/list-category/types';
import { CategorySWRKeys } from '../keys';
import { getCategoriesList } from './service';
import { ListCategoryResponse } from './types';

export function useCategories(args?: ListCategoryRequest) {
  const { authHeaders } = useAuth();
  const key = [
    CategorySWRKeys.CATEGORY,
    CategorySWRKeys.LIST,
    JSON.stringify(args ?? {}),
  ];

  return useSWRImmutable<ListCategoryResponse, Error>(
    key,
    () =>
      getCategoriesList(
        {
          ...(args ?? {}),
        },
        authHeaders,
      ),
    {
      keepPreviousData: true,
    },
  );
}
