import useSWRImmutable from 'swr/immutable';

import { useAuth } from '@vestido-ecommerce/auth/client';

import { ListReturnOrderResponse } from '../../../services';
import { ReturnSWRKeys } from '../keys';
import { getReturnOrdersList } from './service';

export function useReturnOrders() {
  const { authHeaders } = useAuth();
  const key = [ReturnSWRKeys.RETURN, ReturnSWRKeys.LIST];

  return useSWRImmutable<ListReturnOrderResponse, Error>(
    key,
    () => getReturnOrdersList(authHeaders),
    {
      keepPreviousData: true,
    },
  );
}
