import useSWRMutation from 'swr/mutation';

import { useClearCacheOnSuccess } from '@vestido-ecommerce/utils';

import { CategorySWRKeys } from '../keys';
import { upsertCategory } from './service';
import { categoryUpsertRequest, categoryUpsertResponse } from './types';

export const useCategoryUpsert = () => {
  const key = [CategorySWRKeys.CATEGORY, CategorySWRKeys.UPSERT];

  return useSWRMutation<
    categoryUpsertResponse,
    Error,
    string[] | null,
    categoryUpsertRequest
  >(key, (_, { arg }) => upsertCategory({ ...arg }), {
    ...useClearCacheOnSuccess(CategorySWRKeys.CATEGORY),
  });
};
