import useSWRImmutable from 'swr/immutable';

import { useAuth } from '@vestido-ecommerce/auth/client';

import { ListItemSWRKeys } from '../keys';
import { getItemList } from './service';
import { ListItemRequest, ListItemResponse } from './types';

export function useItems(args?: ListItemRequest) {
  const { authHeaders } = useAuth();
  const key = [
    ListItemSWRKeys.ITEM,
    ListItemSWRKeys.LIST,
    JSON.stringify({
      q: args?.q ?? '',
      categoryId: args?.categoryId ?? '',
      gender: args?.gender ?? '',
      limit: args?.limit ?? 50,
      offset: args?.offset ?? 0,
      enabled:
        args?.enabled === true ? true : args?.enabled === false ? false : '',
    }),
  ];

  return useSWRImmutable<ListItemResponse, Error>(key, () =>
    getItemList(
      {
        ...(args ?? {}),
      },
      authHeaders,
    ),
  );
}
