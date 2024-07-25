import useSWRMutation from 'swr/mutation';

import { useClearCacheOnSuccess } from '@vestido-ecommerce/utils';

import { ItemDetailsSWRKeys } from '../keys';
import { itemDelete } from './service';
import { DeleteItemRequest, DeleteItemResponse } from './types';

export function useItemDelete() {
  const key = [ItemDetailsSWRKeys.ITEM, ItemDetailsSWRKeys.DETAILS];

  return useSWRMutation<
    DeleteItemResponse,
    Error,
    string[] | null,
    Pick<DeleteItemRequest, 'itemId'>
  >(key, (_, { arg }) => itemDelete({ ...arg }), {
    ...useClearCacheOnSuccess(ItemDetailsSWRKeys.ITEM),
  });
}
