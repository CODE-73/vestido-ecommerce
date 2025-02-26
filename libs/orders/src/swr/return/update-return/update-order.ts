import useSWRMutation from 'swr/mutation';

import { useAuth } from '@vestido-ecommerce/auth/client';
import { useClearCacheOnSuccess } from '@vestido-ecommerce/utils';

import {
  UpdateReturnRequest,
  UpdateReturnSWRResponse,
} from '../../../services';
import { ReturnSWRKeys } from '../keys';
import { updateReturn } from './service';

export const useUpdateReturnOrder = () => {
  const { isAuthenticated, authHeaders } = useAuth();
  const key = isAuthenticated
    ? [ReturnSWRKeys.UPDATE, ReturnSWRKeys.RETURN]
    : null;

  return useSWRMutation<
    UpdateReturnSWRResponse,
    Error,
    string[] | null,
    UpdateReturnRequest
  >(key, (_, { arg }) => updateReturn({ ...arg }, authHeaders), {
    ...useClearCacheOnSuccess(ReturnSWRKeys.RETURN),
  });
};
