import useSWRMutation from 'swr/dist/mutation';

import { useAuth } from '@vestido-ecommerce/auth/client';
import { useClearCacheOnSuccess } from '@vestido-ecommerce/utils';

import { TaxSWRKeys } from '../keys';
import { deleteTax } from './service';
import { DeleteTaxRequest, DeleteTaxResponse } from './types';

export const useDeleteTax = () => {
  const { authHeaders } = useAuth();
  const key = [TaxSWRKeys.TAX, TaxSWRKeys.DELETE, 'deletion'];

  return useSWRMutation<
    DeleteTaxResponse,
    Error,
    string[] | null,
    DeleteTaxRequest
  >(key, (_, { arg }) => deleteTax({ ...arg }, authHeaders), {
    ...useClearCacheOnSuccess(TaxSWRKeys.TAX),
  });
};
