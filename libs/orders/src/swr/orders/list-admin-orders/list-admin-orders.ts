import useSWRImmutable from 'swr/immutable';

import { useAuth } from '@vestido-ecommerce/auth/client';

import { ListAdminOrderResponse } from '../../../services/orders/list-admin-orders';
import { ListOrderSWRKeys } from '../keys';
import { getAdminOrderList } from './service';

export function useAdminOrders() {
  const { authHeaders } = useAuth();
  const key = [ListOrderSWRKeys.ORDER, ListOrderSWRKeys.LIST];

  return useSWRImmutable<ListAdminOrderResponse, Error>(
    key,
    () => getAdminOrderList(authHeaders),
    {
      keepPreviousData: true,
    },
  );
}
