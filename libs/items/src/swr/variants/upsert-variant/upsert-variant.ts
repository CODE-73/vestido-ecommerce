import useSWRMutation from 'swr/mutation';

import { useClearCacheOnSuccess } from '@vestido-ecommerce/utils';

import { VariantUpsertSWRKeys } from '../keys';
import { upsertVariant } from './service';
import { variantUpsertRequest, variantUpsertResponse } from './types';

export const useVariantUpsert = (itemId: string) => {
  const key = [
    VariantUpsertSWRKeys.VARIANT,
    VariantUpsertSWRKeys.UPSERT,
    itemId,
  ];

  return useSWRMutation<
    variantUpsertResponse,
    Error,
    string[] | null,
    variantUpsertRequest
  >(key, (_, { arg }) => upsertVariant({ ...arg }, itemId), {
    ...useClearCacheOnSuccess(VariantUpsertSWRKeys.VARIANT),
  });
};
