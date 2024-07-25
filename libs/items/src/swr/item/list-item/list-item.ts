import useSWRImmutable from 'swr/immutable';
import { getItemList } from './service';
import { ListItemResponse } from './types';
import { ListItemSWRKeys } from '../keys';
import { ListItemRequest } from '../../../services/items/list-item/types';

export function useItems(args?: ListItemRequest) {
  const key = [
    ListItemSWRKeys.ITEM,
    ListItemSWRKeys.LIST,
    JSON.stringify(args ?? {}),
  ];

  return useSWRImmutable<ListItemResponse, Error>(
    key,
    () =>
      getItemList({
        ...(args ?? {}),
      }),
    {
      keepPreviousData: true,
    },
  );
}
