import useSWRImmutable from 'swr/immutable';
import { ItemDetailsResponse } from '../../../services/get-item/types';
import { getItemDetails } from './service';
import { ItemDetailsSWRKeys } from '../keys';

export function useItem(itemId: string) {
  const key = [ItemDetailsSWRKeys.ITEM, ItemDetailsSWRKeys.DETAILS, itemId];

  return useSWRImmutable<ItemDetailsResponse, Error>(
    key,
    () => getItemDetails(itemId),
    {
      keepPreviousData: true,
    }
  );
}
