import useSWRImmutable from 'swr/immutable';

import { useAuth } from '@vestido-ecommerce/auth/client';

import { TaxSWRKeys } from '../keys';
import { getTax } from './service';
import { GetTaxResponse } from './types';

export const useTax = (taxId?: string | null) => {
  const { authHeaders } = useAuth();
  const key = [TaxSWRKeys.TAX, TaxSWRKeys.DETAILS, taxId];

  return useSWRImmutable<GetTaxResponse, Error>(
    key,
    () => getTax(taxId as string, authHeaders),
    { keepPreviousData: true },
  );
};
