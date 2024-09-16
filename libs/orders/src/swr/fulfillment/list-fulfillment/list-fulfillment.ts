import useSWRImmutable from 'swr/immutable';

import { useAuth } from '@vestido-ecommerce/auth/client';

import { FulfillmentListResponse } from '../../../services/fulfillment/list-fulfillment/types';
import { ListFulfillmentSWRKeys } from '../keys';
import { getFulfillmentList } from './service';

export function useFulfillments() {
  const { authHeaders } = useAuth();
  const key = [ListFulfillmentSWRKeys.FULFILLMENT, ListFulfillmentSWRKeys.LIST];
  return useSWRImmutable<FulfillmentListResponse, Error>(
    key,
    () => getFulfillmentList(authHeaders),
    {
      keepPreviousData: true,
    },
  );
}
