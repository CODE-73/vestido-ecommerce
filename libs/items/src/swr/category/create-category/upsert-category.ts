import useSWRMutation from 'swr/mutation';
import { CategoryUpsertSWRKeys } from '../keys';
import { categoryUpsertRequest, categoryUpsertResponse } from './types';
import { upsertCategory } from './service';

export const useCategoryUpsert = () => {
  const key = [CategoryUpsertSWRKeys.CATEGORY, CategoryUpsertSWRKeys.UPSERT];

  return useSWRMutation<
    categoryUpsertResponse,
    Error,
    string[] | null,
    categoryUpsertRequest
  >(key, (_, { arg }) => upsertCategory({ ...arg }));
};
