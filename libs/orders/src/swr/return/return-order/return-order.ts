import useSWRMutation from 'swr/mutation';
import { useAuth } from '@vestido-ecommerce/auth/client';

import { ReturnSWRKeys } from '../keys';
import {
  ReturnOrderSWRResponse,
  ReturnOrderRequest,
} from 'libs/orders/src/services';

import { useClearCacheOnSuccess } from '@vestido-ecommerce/utils';
import { returnOrder } from './service';

export const useCreateReturnOrder = () => {
  const { isAuthenticated, authHeaders } = useAuth();
  const key = isAuthenticated
    ? [ReturnSWRKeys.INITIATE, ReturnSWRKeys.RETURN]
    : null;

  return useSWRMutation<
    ReturnOrderSWRResponse,
    Error,
    string[] | null,
    ReturnOrderRequest
  >(key, (_, { arg }) => returnOrder({ ...arg }, authHeaders), {
    ...useClearCacheOnSuccess(ReturnSWRKeys.RETURN),
  });
};
