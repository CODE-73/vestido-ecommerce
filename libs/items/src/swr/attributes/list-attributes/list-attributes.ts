import useSWRImmutable from 'swr/immutable';
import { AttributeListSWRKeys } from '../keys';
import { AttributeListResponse } from './types';
import { getAttributesList } from './service';
import { ListAttributesRequest } from '../../../services/attributes/list-attributes/types';

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
    }
  );
}
