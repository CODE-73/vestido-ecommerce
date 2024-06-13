import useSWRImmutable from 'swr/immutable';
import { VariantListSWRKeys } from '../keys';
import { VariantListResponse } from './types';
import { getVariantsList } from './service';

export function useVariants(itemId: string, query?: string) {
  const key = itemId
    ? [VariantListSWRKeys.VARIANT, VariantListSWRKeys.LIST, query, itemId]
    : null;

  return useSWRImmutable<VariantListResponse, Error>(
    key,
    () => getVariantsList(itemId, query!),
    {
      keepPreviousData: true,
    }
  );
}
