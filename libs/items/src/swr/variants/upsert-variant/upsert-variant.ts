import useSWRMutation from 'swr/mutation';
import { VariantUpsertSWRKeys } from '../keys';
import { variantUpsertRequest, variantUpsertResponse } from './types';
import { upsertVariant } from './service';

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
  >(key, (_, { arg }) => upsertVariant({ ...arg }, itemId));
};
