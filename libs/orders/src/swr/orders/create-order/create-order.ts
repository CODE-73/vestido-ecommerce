import useSWRMutation from 'swr/mutation';

import { useAuth } from '@vestido-ecommerce/auth';
import { useClearCacheOnSuccess } from '@vestido-ecommerce/utils';

import {
  CreateOrderRequest,
  CreateOrderResponse,
} from '../../../services/orders/create-order/types';
import { CreateOrderSWRKeys } from '../keys';
import { createNewOrder } from './service';

export const useCreateOrder = () => {
  const { authHeaders } = useAuth();
  const key = [CreateOrderSWRKeys.CREATE, CreateOrderSWRKeys.ORDER];

  return useSWRMutation<
    CreateOrderResponse,
    Error,
    string[] | null,
    CreateOrderRequest
  >(key, (_, { arg }) => createNewOrder({ ...arg }, authHeaders), {
    ...useClearCacheOnSuccess(CreateOrderSWRKeys.ORDER),
  });
};
