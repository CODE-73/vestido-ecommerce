import useSWRMutation from 'swr/mutation';

import { useClearCacheOnSuccess } from '@vestido-ecommerce/utils';

import { VariantUpsertSWRKeys } from '../keys';
import { upsertVariant } from './service';
import { VariantUpsertRequest, VariantUpsertResponse } from './types';

export const useVariantUpsert = (itemId: string) => {
  const key = [
    VariantUpsertSWRKeys.VARIANT,
    VariantUpsertSWRKeys.UPSERT,
    itemId,
  ];

  return useSWRMutation<
    VariantUpsertResponse,
    Error,
    string[] | null,
    VariantUpsertRequest
  >(key, (_, { arg }) => upsertVariant({ ...arg }, itemId), {
    ...useClearCacheOnSuccess(VariantUpsertSWRKeys.VARIANT),
  });
};
