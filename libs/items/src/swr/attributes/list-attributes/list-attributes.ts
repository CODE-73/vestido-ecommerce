import useSWRImmutable from 'swr/immutable';

import { useAuth } from '@vestido-ecommerce/auth/client';

import { ListAttributesRequest } from '../../../services/attributes/list-attributes/types';
import { AttributeListSWRKeys } from '../keys';
import { getAttributesList } from './service';
import { AttributeListResponse } from './types';

export function useAttributes(args?: ListAttributesRequest) {
  const { authHeaders } = useAuth();
  const key = [
    AttributeListSWRKeys.ATTRIBUTE,
    AttributeListSWRKeys.LIST,
    JSON.stringify(args ?? {}),
  ];

  return useSWRImmutable<AttributeListResponse, Error>(
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
