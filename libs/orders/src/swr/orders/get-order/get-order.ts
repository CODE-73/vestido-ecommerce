import useSWRImmutable from 'swr/immutable';

import { useAuth } from '@vestido-ecommerce/auth/client';

import { GetOrderResponse } from '../../../services/orders/get-order/types';
import { OrderSWRKeys } from '../keys';
import { getOrderDetails } from './service';

export function useOrder(orderId?: string | null) {
  const { authHeaders } = useAuth();
  const key = orderId ? [OrderSWRKeys.GET, OrderSWRKeys.ORDER, orderId] : null;

  return useSWRImmutable<GetOrderResponse, Error>(key, () =>
    getOrderDetails(orderId as string, authHeaders),
  );
}
