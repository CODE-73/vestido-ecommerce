import useSWRImmutable from 'swr/immutable';

import { useAuth } from '@vestido-ecommerce/auth/client';

import { FulfillmentListResponse } from '../../../services/fulfillment/list-fulfillment/types';
import { ListFulfillmentSWRKeys } from '../keys';
import { getFulfillmentList } from './service';

export function useFulfillments(sortBy: string, sortOrder: string) {
  const { authHeaders } = useAuth();
  const key = [
    ListFulfillmentSWRKeys.FULFILLMENT,
    ListFulfillmentSWRKeys.LIST,
    sortBy,
    sortOrder,
  ];
  return useSWRImmutable<FulfillmentListResponse, Error>(
    key,
    () => getFulfillmentList(authHeaders, sortBy, sortOrder),
    {
      keepPreviousData: true,
    },
  );
}
