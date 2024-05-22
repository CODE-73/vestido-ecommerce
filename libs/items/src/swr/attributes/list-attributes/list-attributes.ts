import useSWRImmutable from 'swr/immutable';
import { AttributeListSWRKeys } from '../keys';
import { AttributeListResponse } from './types';
import { getAttributesList } from './service';

export function useAttributes(query?: string) {
  const key = [
    AttributeListSWRKeys.ATTRIBUTE,
    AttributeListSWRKeys.LIST,
    query,
  ];

  return useSWRImmutable<AttributeListResponse, Error>(
    key,
    () => getAttributesList(query),
    {
      keepPreviousData: true,
    }
  );
}
