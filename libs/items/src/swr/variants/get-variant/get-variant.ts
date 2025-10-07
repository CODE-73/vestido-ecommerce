import useSWRImmutable from 'swr/immutable';

import { useAuth } from '@vestido-ecommerce/auth/client';

import { VariantDetailsSWRKeys } from '../keys';
import { getVariantDetails } from './service';
import { VariantDetailsResponse } from './types';

export function useVariant(itemId: string, variantId?: string | null) {
  const { authHeaders } = useAuth();
  const key = variantId
    ? [
        VariantDetailsSWRKeys.VARIANT,
        VariantDetailsSWRKeys.DETAILS,
        variantId,
        itemId,
      ]
    : null;

  return useSWRImmutable<VariantDetailsResponse, Error>(
    key,
    () => getVariantDetails(variantId as string, itemId, authHeaders),
    {
      keepPreviousData: true,
    },
  );
}
