import useSWRImmutable from 'swr/immutable';

import { useAuth } from '@vestido-ecommerce/auth/client';

import { GetReturnOrderSWRResponse } from '../../../services';
import { ReturnSWRKeys } from '../keys';
import { getReturnOrderDetails } from './service';

export function useReturnOrder(returnId?: string | null) {
  const { authHeaders } = useAuth();
  const key = returnId
    ? [ReturnSWRKeys.GET, ReturnSWRKeys.RETURN, returnId]
    : null;

  return useSWRImmutable<GetReturnOrderSWRResponse, Error>(key, () =>
    getReturnOrderDetails(returnId as string, authHeaders),
  );
}
