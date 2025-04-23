import useSWRImmutable from 'swr/immutable';

import { useAuth } from '@vestido-ecommerce/auth/client';

import {
  ListReturnOrderRequest,
  ListReturnOrderResponse,
} from '../../../services';
import { ReturnSWRKeys } from '../keys';
import { getReturnOrdersList } from './service';

export function useReturnOrders(args?: ListReturnOrderRequest) {
  const { isAuthenticated, authHeaders } = useAuth();
  const key = isAuthenticated
    ? [ReturnSWRKeys.RETURN, ReturnSWRKeys.LIST, args]
    : null;

  return useSWRImmutable<ListReturnOrderResponse, Error>(
    key,
    () => getReturnOrdersList(authHeaders, args),
    {
      keepPreviousData: true,
    },
  );
}
