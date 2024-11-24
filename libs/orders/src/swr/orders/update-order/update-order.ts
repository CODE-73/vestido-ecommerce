import useSWRMutation from 'swr/mutation';

import { useAuth } from '@vestido-ecommerce/auth/client';
import { useClearCacheOnSuccess } from '@vestido-ecommerce/utils';

import { UpdateOrderSWRKeys } from '../keys';
import { updateOrder } from './service';
import { UpdateOrderRequest, UpdateOrderResponse } from './types';

export const useUpdateOrder = () => {
  const { authHeaders } = useAuth();
  const key = [UpdateOrderSWRKeys.ORDER, UpdateOrderSWRKeys.UPDATE];

  return useSWRMutation<
    UpdateOrderResponse,
    Error,
    string[] | null,
    UpdateOrderRequest
  >(key, (_, { arg }) => updateOrder({ ...arg }, authHeaders), {
    ...useClearCacheOnSuccess(UpdateOrderSWRKeys.ORDER),
  });
};
