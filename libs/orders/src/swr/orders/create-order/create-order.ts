import useSWRMutation from 'swr/mutation';
import {
  CreateOrderRequest,
  CreateOrderResponse,
} from '../../../services/orders/create-order/types';
import { useAuth } from '@vestido-ecommerce/auth';
import { createNewOrder } from './service';
import { CreateOrderSWRKeys } from '../keys';
import { useClearCacheOnSuccess } from '@vestido-ecommerce/utils';

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
