import useSWRImmutable from 'swr/immutable';

import { useAuth } from '@vestido-ecommerce/auth/client';

import { ListAdminOrderResponse } from '../../../services/orders/list-admin-orders';
import { OrderSWRKeys } from '../keys';
import { getAdminOrderList } from './service';

export function useAdminOrders(
  sortBy: string,
  sortOrder: string,
  orderStatuses: string[],
) {
  const { isAuthenticated, authHeaders } = useAuth();
  const key = isAuthenticated
    ? [OrderSWRKeys.ORDER, OrderSWRKeys.LIST, sortBy, sortOrder, orderStatuses]
    : null;

  return useSWRImmutable<ListAdminOrderResponse, Error>(
    key,
    () => getAdminOrderList(authHeaders, sortBy, sortOrder, orderStatuses),
    {
      keepPreviousData: true,
    },
  );
}
