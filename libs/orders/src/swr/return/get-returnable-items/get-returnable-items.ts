import useSWRImmutable from 'swr/immutable';

import { useAuth } from '@vestido-ecommerce/auth/client';

import { GetReturnableitemsSWRResponse } from '../../../services';
import { ReturnSWRKeys } from '../keys';
import { getReturnableItems } from './service';

export function useReturnableItems(orderId: string) {
  const { authHeaders } = useAuth();
  const key = orderId
    ? [ReturnSWRKeys.GET, ReturnSWRKeys.RETURN, orderId]
    : null;

  return useSWRImmutable<GetReturnableitemsSWRResponse, Error>(key, () =>
    getReturnableItems(orderId as string, authHeaders),
  );
}
