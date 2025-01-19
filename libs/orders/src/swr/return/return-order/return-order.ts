import useSWRMutation from 'swr/mutation';

import { useAuth } from '@vestido-ecommerce/auth/client';
import { useClearCacheOnSuccess } from '@vestido-ecommerce/utils';

import { ReturnOrderRequest, ReturnOrderSWRResponse } from '../../../services';
import { ReturnSWRKeys } from '../keys';
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
