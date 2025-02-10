import useSWRMutation from 'swr/mutation';

import { useAuth } from '@vestido-ecommerce/auth/client';
import { useClearCacheOnSuccess } from '@vestido-ecommerce/utils';

import { OrderSWRKeys } from '../keys';
import { cancelOrder } from './service';
import { CancelOrderRequest, CancelOrderResponse } from './types';

export const useCancelOrder = () => {
  const { isAuthenticated, authHeaders } = useAuth();
  const key = isAuthenticated
    ? [OrderSWRKeys.CANCEL, OrderSWRKeys.ORDER]
    : null;

  return useSWRMutation<
    CancelOrderResponse,
    Error,
    string[] | null,
    CancelOrderRequest
  >(key, (_, { arg }) => cancelOrder({ ...arg }, authHeaders), {
    ...useClearCacheOnSuccess(OrderSWRKeys.ORDER),
  });
};
