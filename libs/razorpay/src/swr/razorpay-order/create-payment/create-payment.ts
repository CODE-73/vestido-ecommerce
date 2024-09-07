import useSWRMutation from 'swr/mutation';

import { useAuth } from '@vestido-ecommerce/auth/client';
import { useClearCacheOnSuccess } from '@vestido-ecommerce/utils';

import { CreatePaymentKeys } from '../key';
import { createRazorpayPayment } from './service';
import { CreatePaymentRequest, RazorpayResponse } from './types';

export const useLaunchRazorpay = () => {
  const { authHeaders } = useAuth();

  const key = [CreatePaymentKeys.CREATE, CreatePaymentKeys.PAYMENT];

  return useSWRMutation<
    RazorpayResponse,
    Error,
    string[] | null,
    CreatePaymentRequest
  >(key, (_, { arg }) => createRazorpayPayment({ ...arg }, authHeaders), {
    ...useClearCacheOnSuccess(CreatePaymentKeys.PAYMENT),
  });
};
