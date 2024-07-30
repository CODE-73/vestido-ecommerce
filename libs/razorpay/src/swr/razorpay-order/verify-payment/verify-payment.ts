import useSWRMutation from 'swr/mutation';
import {
  verifyPaymentRequest,
  verifyPaymentResponse,
} from 'libs/razorpay/src/services';
import { CreateRPOrderSWRKeys } from '../key';
import { useClearCacheOnSuccess } from '@vestido-ecommerce/utils';
import { useAuth } from '@vestido-ecommerce/auth';
import { verifyPayment } from './service';

export const useVerifyPayment = () => {
  const { authHeaders } = useAuth();
  const key = [CreateRPOrderSWRKeys.CREATE, CreateRPOrderSWRKeys.ORDER];

  return useSWRMutation<
    verifyPaymentResponse,
    Error,
    string[] | null,
    verifyPaymentRequest
  >(key, (_, { arg }) => verifyPayment({ ...arg }, authHeaders), {
    ...useClearCacheOnSuccess(CreateRPOrderSWRKeys.ORDER),
  });
};
