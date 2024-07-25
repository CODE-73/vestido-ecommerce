import useSWRImmutable from 'swr/immutable';

import { ListAttributesRequest } from '../../../services/attributes/list-attributes/types';
import { AttributeListSWRKeys } from '../keys';
import { getAttributesList } from './service';
import { AttributeListResponse } from './types';

export function useAttributes(args?: ListAttributesRequest) {
  const key = [
    AttributeListSWRKeys.ATTRIBUTE,
    AttributeListSWRKeys.LIST,
    JSON.stringify(args ?? {}),
  ];

  return useSWRImmutable<AttributeListResponse, Error>(
    key,
    () =>
      getAttributesList({
        ...(args ?? {}),
      }),
    {
      keepPreviousData: true,
    },
  );
}
