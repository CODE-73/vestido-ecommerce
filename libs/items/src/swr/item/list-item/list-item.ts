import useSWRImmutable from 'swr/immutable';

import { useAuth } from '@vestido-ecommerce/auth/client';

import { ListItemRequest } from '../../../services/items/list-item/types';
import { ListItemSWRKeys } from '../keys';
import { getItemList } from './service';
import { ListItemResponse } from './types';

export function useItems(args?: ListItemRequest) {
  const { authHeaders } = useAuth();
  const key = [
    ListItemSWRKeys.ITEM,
    ListItemSWRKeys.LIST,
    JSON.stringify(args ?? {}),
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
