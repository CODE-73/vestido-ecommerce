import useSWRMutation from 'swr/mutation';
import {
  CreateRPOrderRequest,
  CreateRPOrderResponse,
} from 'libs/razorpay/src/services';
import { CreateRPOrderSWRKeys } from '../key';
import { useClearCacheOnSuccess } from '@vestido-ecommerce/utils';
import { useAuth } from '@vestido-ecommerce/auth';
import { createNewRazorpayOrder } from './service';

export const useRazorpayCreateOrder = () => {
  const { authHeaders } = useAuth();
  const key = [CreateRPOrderSWRKeys.CREATE, CreateRPOrderSWRKeys.ORDER];

  return useSWRMutation<
    CreateRPOrderResponse,
    Error,
    string[] | null,
    CreateRPOrderRequest
  >(key, (_, { arg }) => createNewRazorpayOrder({ ...arg }, authHeaders), {
    ...useClearCacheOnSuccess(CreateRPOrderSWRKeys.ORDER),
  });
};
