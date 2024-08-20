import useSWRMutation from 'swr/mutation';

import { useClearCacheOnSuccess } from '@vestido-ecommerce/utils';

import { CreatePaymentKeys } from '../key';
import { createNewPayment } from './service';
import { CreatePaymentRequest, RazorpayResponse } from './types';

export const useCreatePayment = () => {
  const key = [CreatePaymentKeys.CREATE, CreatePaymentKeys.PAYMENT];

  return useSWRMutation<
    RazorpayResponse,
    Error,
    string[] | null,
    CreatePaymentRequest
  >(key, (_, { arg }) => createNewPayment({ ...arg }), {
    ...useClearCacheOnSuccess(CreatePaymentKeys.PAYMENT),
  });
};
