import useSWRMutation from 'swr/mutation';

import { useAuth } from '@vestido-ecommerce/auth/client';
import { useClearCacheOnSuccess } from '@vestido-ecommerce/utils';

import { CategorySWRKeys } from '../keys';
import { upsertCategory } from './service';
import { CategoryUpsertRequest, categoryUpsertResponse } from './types';

export const useCategoryUpsert = () => {
  const { authHeaders } = useAuth();
  const key = [CategorySWRKeys.CATEGORY, CategorySWRKeys.UPSERT];

  return useSWRMutation<
    categoryUpsertResponse,
    Error,
    string[] | null,
    CategoryUpsertRequest
  >(key, (_, { arg }) => upsertCategory({ ...arg }, authHeaders), {
    ...useClearCacheOnSuccess(CategorySWRKeys.CATEGORY),
  });
};
