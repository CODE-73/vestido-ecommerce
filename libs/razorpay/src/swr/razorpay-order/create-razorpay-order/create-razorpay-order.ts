import useSWRMutation from 'swr/mutation';

import { useAuth } from '@vestido-ecommerce/auth/client';
import { useClearCacheOnSuccess } from '@vestido-ecommerce/utils';

import { CreateRPOrderRequest, CreateRPOrderResponse } from '../../../services';
import { CreateRPOrderSWRKeys } from '../key';
import { createNewRazorpayOrder } from './service';

export const useRazorpayCreateOrder = () => {
  const { isAuthenticated, authHeaders } = useAuth();
  const key = isAuthenticated
    ? [CreateRPOrderSWRKeys.CREATE, CreateRPOrderSWRKeys.ORDER]
    : null;

  return useSWRMutation<
    CreateRPOrderResponse,
    Error,
    string[] | null,
    CreateRPOrderRequest
  >(key, (_, { arg }) => createNewRazorpayOrder({ ...arg }, authHeaders), {
    ...useClearCacheOnSuccess(CreateRPOrderSWRKeys.ORDER),
  });
};
