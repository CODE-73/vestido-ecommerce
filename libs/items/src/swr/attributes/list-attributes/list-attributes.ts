import useSWRImmutable from 'swr/immutable';

import { useAuth } from '@vestido-ecommerce/auth/client';

import { AttributeListSWRKeys } from '../keys';
import { getAttributesList } from './service';
import { ListAttributeRequest, ListAttributeResponse } from './types';

export function useAttributes(args?: ListAttributeRequest) {
  const { authHeaders } = useAuth();
  const key = [
    AttributeListSWRKeys.ATTRIBUTE,
    AttributeListSWRKeys.LIST,
    JSON.stringify(args ?? {}),
  ];

  return useSWRImmutable<ListAttributeResponse, Error>(
    key,
    () =>
      getAttributesList(
        {
          ...(args ?? {}),
        },
        authHeaders,
      ),
    {
      keepPreviousData: true,
    },
  );
}
