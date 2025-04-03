import useSWRImmutable from 'swr/immutable';

import { useAuth } from '@vestido-ecommerce/auth/client';

import { OrderSWRKeys } from '../keys';
import { getOrderDetails } from './service';
import { GetOrderResponse } from './types';

export function useOrder(orderId?: string | null) {
  const { authHeaders } = useAuth();
  const key = orderId ? [OrderSWRKeys.GET, OrderSWRKeys.ORDER, orderId] : null;

  return useSWRImmutable<GetOrderResponse, Error>(key, () =>
    getOrderDetails(orderId as string, authHeaders),
  );
}
