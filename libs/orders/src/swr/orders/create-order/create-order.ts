import useSWRMutation from 'swr/mutation';

import { useAuth } from '@vestido-ecommerce/auth/client';
import { useClearCacheOnSuccess } from '@vestido-ecommerce/utils';

import {
  CreateOrderRequest,
  CreateOrderSWRResponse,
} from '../../../services/orders/create-order/types';
import { OrderSWRKeys } from '../keys';
import { createNewOrder } from './service';

export const useCreateOrder = () => {
  const { isAuthenticated, authHeaders } = useAuth();
  const key = isAuthenticated
    ? [OrderSWRKeys.CREATE, OrderSWRKeys.ORDER]
    : null;

  return useSWRMutation<
    CreateOrderSWRResponse,
    Error,
    string[] | null,
    CreateOrderRequest
  >(key, (_, { arg }) => createNewOrder({ ...arg }, authHeaders), {
    ...useClearCacheOnSuccess(OrderSWRKeys.ORDER),
  });
};
