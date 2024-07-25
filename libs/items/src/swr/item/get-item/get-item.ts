import useSWRImmutable from 'swr/immutable';
import { ItemDetailsResponse } from '../../../services/items/get-item/types';
import { getItemDetails } from './service';
import { ItemDetailsSWRKeys } from '../keys';

export function useItem(itemId?: string | null) {
  const key = itemId
    ? [ItemDetailsSWRKeys.ITEM, ItemDetailsSWRKeys.DETAILS, itemId]
    : null;

  return useSWRImmutable<ItemDetailsResponse, Error>(
    key,
    () => getItemDetails(itemId as string),
    {
      keepPreviousData: true,
    },
  );
}
