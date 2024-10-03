import useSWRMutation from 'swr/dist/mutation';

import { useAuth } from '@vestido-ecommerce/auth/client';
import { useClearCacheOnSuccess } from '@vestido-ecommerce/utils';

import { TaxSWRKeys } from '../keys';
import { upsertTax } from './service';
import { UpsertTaxRequest, UpsertTaxResponse } from './types';

export const useUpsertTax = () => {
  const { authHeaders } = useAuth();
  const key = [TaxSWRKeys.TAX, TaxSWRKeys.UPSERT];

  return useSWRMutation<
    UpsertTaxResponse,
    Error,
    string[] | null,
    UpsertTaxRequest
  >(key, (_, { arg }) => upsertTax({ ...arg }, authHeaders), {
    ...useClearCacheOnSuccess(TaxSWRKeys.TAX),
  });
};
