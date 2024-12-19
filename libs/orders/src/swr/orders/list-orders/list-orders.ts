import useSWRImmutable from 'swr/immutable';

import { useAuth } from '@vestido-ecommerce/auth/client';

import { ListOrderResponse } from '../../../services/orders/list-order/types';
import { OrderSWRKeys } from '../keys';
import { getOrderList } from './service';

export function useOrders() {
  const { isAuthenticated, authHeaders } = useAuth();
  const key = isAuthenticated ? [OrderSWRKeys.ORDER, OrderSWRKeys.LIST] : null;

  return useSWRImmutable<ListOrderResponse, Error>(key, () =>
    getOrderList(authHeaders),
  );
}
