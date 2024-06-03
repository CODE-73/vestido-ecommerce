import useSWRImmutable from 'swr/immutable';
import { getItemList } from './service';
import { ListItemResponse } from './types';
import { ListItemSWRKeys } from '../keys';

export function useItems(query?: string) {
  const key = [ListItemSWRKeys.ITEM, ListItemSWRKeys.LIST, query]; // Only fetch when there's a query or explicitly decided to fetch with an empty string

  return useSWRImmutable<ListItemResponse, Error>(
    key,
    () => getItemList(query), // You can directly pass the function here
    {
      keepPreviousData: true,
    }
  );
}
