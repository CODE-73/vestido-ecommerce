import useSWRMutation from 'swr/mutation';

import { useAuth } from '@vestido-ecommerce/auth/client';
import { useClearCacheOnSuccess } from '@vestido-ecommerce/utils';

import { ItemUpsertSWRKeys } from '../keys';
import { upsertItem } from './service';
import { ItemUpsertRequest, ItemUpsertResponse } from './types';

export const useItemUpsert = () => {
  const { authHeaders } = useAuth();
  const key = [ItemUpsertSWRKeys.ITEM, ItemUpsertSWRKeys.UPSERT];

  return useSWRMutation<
    ItemUpsertResponse,
    Error,
    string[] | null,
    ItemUpsertRequest
  >(key, (_, { arg }) => upsertItem({ ...arg }, authHeaders), {
    ...useClearCacheOnSuccess(ItemUpsertSWRKeys.ITEM),
  });
};
