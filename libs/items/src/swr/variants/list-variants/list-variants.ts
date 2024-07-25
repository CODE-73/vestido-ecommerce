import useSWRImmutable from 'swr/immutable';

import { VariantListSWRKeys } from '../keys';
import { getVariantsList } from './service';
import { VariantListResponse } from './types';

export function useVariants(itemId: string, query?: string) {
  const key = itemId
    ? [VariantListSWRKeys.VARIANT, VariantListSWRKeys.LIST, query, itemId]
    : null;

  return useSWRImmutable<VariantListResponse, Error>(
    key,
    () => getVariantsList(itemId, query!),
    {
      keepPreviousData: true,
    },
  );
}
