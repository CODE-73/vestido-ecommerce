import useSWRMutation from 'swr/mutation';

import { useAuth } from '@vestido-ecommerce/auth/client';
import { useClearCacheOnSuccess } from '@vestido-ecommerce/utils';

import { ItemDetailsSWRKeys } from '../keys';
import { itemDelete } from './service';
import { DeleteItemRequest, DeleteItemResponse } from './types';

export function useItemDelete() {
  const { authHeaders, isAuthenticated } = useAuth();
  const key = isAuthenticated
    ? [ItemDetailsSWRKeys.ITEM, ItemDetailsSWRKeys.DETAILS]
    : null;

  return useSWRMutation<
    DeleteItemResponse,
    Error,
    string[] | null,
    Pick<DeleteItemRequest, 'itemId'>
  >(key, (_, { arg }) => itemDelete({ ...arg }, authHeaders), {
    ...useClearCacheOnSuccess(ItemDetailsSWRKeys.ITEM),
  });
}
