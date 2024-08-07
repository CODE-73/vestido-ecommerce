import useSWRImmutable from 'swr/immutable';

import { useAuth } from '@vestido-ecommerce/auth';

import { ListOrderResponse } from '../../../services/orders/list-order/types';
import { ListOrderSWRKeys } from '../keys';
import { getOrderList } from './service';

export function useOrders() {
  const { authHeaders } = useAuth();
  const key = [ListOrderSWRKeys.ORDER, ListOrderSWRKeys.LIST];

  return useSWRImmutable<ListOrderResponse, Error>(
    key,
    () => getOrderList(authHeaders),
    {
      keepPreviousData: true,
    },
  );
}
