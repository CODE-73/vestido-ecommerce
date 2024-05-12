import useSWRMutation from 'swr/mutation';
import { CategorySWRKeys } from '../keys';
import { CategoryUpsertRequest, CategoryUpsertResponse } from './types';
import { upsertCategory } from './service';

export async function useCategoryUpsert(data: CategoryUpsertRequest) {
  const key = [CategorySWRKeys.CATEGORY];

  return useSWRMutation<
    CategoryUpsertResponse,
    Error,
    String[] | null,
    CategoryUpsertRequest
  >(key, (_, { arg }) => upsertCategory({ ...arg }));
}
