import useSWRImmutable from 'swr/immutable';

import { useAuth } from '@vestido-ecommerce/auth/client';

import { ListFulfillmentRequest } from '../../../services/fulfillment/list-fulfillment/types';
import { ListFulfillmentSWRKeys } from '../keys';
import { getFulfillmentList } from './service';
import { FulfillmentListResponse } from './types';

export function useFulfillments(args?: ListFulfillmentRequest) {
  const { isAuthenticated, authHeaders } = useAuth();
  const key = isAuthenticated
    ? [
        ListFulfillmentSWRKeys.FULFILLMENT,
        ListFulfillmentSWRKeys.LIST,
        JSON.stringify(args),
      ]
    : null;

  return useSWRImmutable<FulfillmentListResponse, Error>(
    key,
    () => getFulfillmentList(authHeaders, args),
    {
      keepPreviousData: true,
    },
  );
}
