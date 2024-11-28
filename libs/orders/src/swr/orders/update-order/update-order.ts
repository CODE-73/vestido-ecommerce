import useSWRMutation from 'swr/mutation';

import { useAuth } from '@vestido-ecommerce/auth/client';
import { useClearCacheOnSuccess } from '@vestido-ecommerce/utils';

import { OrderSWRKeys } from '../keys';
import { updateOrder } from './service';
import { UpdateOrderRequest, UpdateOrderResponse } from './types';

export const useUpdateOrder = () => {
  const { authHeaders } = useAuth();
  const key = [OrderSWRKeys.ORDER, OrderSWRKeys.UPDATE];

  return useSWRMutation<
    UpdateOrderResponse,
    Error,
    string[] | null,
    UpdateOrderRequest
  >(key, (_, { arg }) => updateOrder({ ...arg }, authHeaders), {
    ...useClearCacheOnSuccess(OrderSWRKeys.ORDER),
  });
};
