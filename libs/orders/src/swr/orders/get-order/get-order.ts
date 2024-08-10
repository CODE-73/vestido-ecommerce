import useSWRImmutable from 'swr/immutable';

import { GetOrderResponse } from '../../../services/orders/get-order/types';
import { GetOrderSWRKeys } from '../keys';
import { getOrderDetails } from './service';

export function useOrder(orderId?: string | null) {
  const key = orderId
    ? [GetOrderSWRKeys.GET, GetOrderSWRKeys.ORDER, orderId]
    : null;

  return useSWRImmutable<GetOrderResponse, Error>(
    key,
    () => getOrderDetails(orderId as string),
    {
      keepPreviousData: true,
    },
  );
}
