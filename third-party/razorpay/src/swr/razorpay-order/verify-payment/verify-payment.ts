import useSWRMutation from 'swr/mutation';

import { useAuth } from '@vestido-ecommerce/auth/client';
import { useClearCacheOnSuccess } from '@vestido-ecommerce/utils';

import { verifyPaymentRequest, verifyPaymentResponse } from '../../../services';
import { CreateRPOrderSWRKeys } from '../key';
import { verifyPayment } from './service';

export const useVerifyPayment = () => {
  const { isAuthenticated, authHeaders } = useAuth();
  const key = isAuthenticated
    ? [CreateRPOrderSWRKeys.CREATE, CreateRPOrderSWRKeys.ORDER]
    : null;

  return useSWRMutation<
    verifyPaymentResponse,
    Error,
    string[] | null,
    verifyPaymentRequest
  >(key, (_, { arg }) => verifyPayment({ ...arg }, authHeaders), {
    ...useClearCacheOnSuccess(CreateRPOrderSWRKeys.ORDER),
  });
};