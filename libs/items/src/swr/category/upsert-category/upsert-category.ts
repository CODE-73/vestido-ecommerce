import useSWRMutation from 'swr/mutation';

import { useClearCacheOnSuccess } from '@vestido-ecommerce/utils';

import { CategoryUpsertSWRKeys } from '../keys';
import { upsertCategory } from './service';
import { categoryUpsertRequest, categoryUpsertResponse } from './types';

export const useCategoryUpsert = () => {
  const key = [CategoryUpsertSWRKeys.CATEGORY, CategoryUpsertSWRKeys.UPSERT];

  return useSWRMutation<
    categoryUpsertResponse,
    Error,
    string[] | null,
    categoryUpsertRequest
  >(key, (_, { arg }) => upsertCategory({ ...arg }), {
    ...useClearCacheOnSuccess(CategoryUpsertSWRKeys.CATEGORY),
  });
};
