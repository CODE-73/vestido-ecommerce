import useSWRMutation from 'swr/mutation';
import { DeleteItemResponse, DeleteItemRequest } from './types';
import { deleteItem } from './service';
import { ItemDetailsSWRKeys } from '../keys';
import { useClearCacheOnSuccess } from '@vestido-ecommerce/utils';

export function useItemDelete() {
  const key = [ItemDetailsSWRKeys.ITEM, ItemDetailsSWRKeys.DETAILS];

  return useSWRMutation<
    DeleteItemResponse,
    Error,
    string[] | null,
    Pick<DeleteItemRequest, 'itemId'>
  >(key, (_, { arg }) => deleteItem({ ...arg }), {
    ...useClearCacheOnSuccess(ItemDetailsSWRKeys.ITEM),
  });
}
