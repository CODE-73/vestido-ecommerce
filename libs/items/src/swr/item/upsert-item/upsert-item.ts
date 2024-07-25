import useSWRMutation from 'swr/mutation';

import { useClearCacheOnSuccess } from '@vestido-ecommerce/utils';

import { ItemUpsertSWRKeys } from '../keys';
import { upsertItem } from './service';
import { ItemUpsertRequest, ItemUpsertResponse } from './types';

export const useItemUpsert = () => {
  const key = [ItemUpsertSWRKeys.ITEM, ItemUpsertSWRKeys.UPSERT];

  return useSWRMutation<
    ItemUpsertResponse,
    Error,
    string[] | null,
    ItemUpsertRequest
  >(key, (_, { arg }) => upsertItem({ ...arg }), {
    ...useClearCacheOnSuccess(ItemUpsertSWRKeys.ITEM),
  });
};
