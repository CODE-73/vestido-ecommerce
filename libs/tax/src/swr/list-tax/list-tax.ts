import useSWRImmutable from 'swr/dist/immutable';

import { useAuth } from '@vestido-ecommerce/auth/client';

import { ListTaxArgs } from '../../services';
import { TaxSWRKeys } from '../keys';
import { listTax } from './service';
import { ListTaxResponse } from './types';

export function useTaxes(args?: ListTaxArgs) {
  const { authHeaders } = useAuth();
  const key = [TaxSWRKeys.TAX, TaxSWRKeys.LIST, JSON.stringify(args ?? {})];

  return useSWRImmutable<ListTaxResponse, Error>(
    key,
    () =>
      listTax(
        {
          ...(args ?? {}),
        },
        authHeaders,
      ),
    {
      keepPreviousData: true,
    },
  );
}
