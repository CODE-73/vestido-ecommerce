import useSWRImmutable from 'swr/immutable';

import { VariantDetailsResponse } from '../../../services/variants/get-variant/types';
import { VariantDetailsSWRKeys } from '../keys';
import { getVariantDetails } from './service';

export function useVariant(itemId: string, variantId?: string | null) {
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
    () => getVariantDetails(variantId as string, itemId),
    {
      keepPreviousData: true,
    },
  );
}
