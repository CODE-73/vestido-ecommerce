import useSWRImmutable from 'swr/immutable';

import { useAuth } from '@vestido-ecommerce/auth/client';

import { FulfillmentDetailsResponse } from '../../../services/fulfillment/get-fulfillment/types';
import { FulfillmentDetailsSWRKeys } from '../keys';
import { getFulfillmentDetails } from './service';

export function useFulfillment(fulfillmentId?: string | null) {
  const { authHeaders } = useAuth();
  const key = fulfillmentId
    ? [
        FulfillmentDetailsSWRKeys.FULFILLMENT,
        FulfillmentDetailsSWRKeys.DETAILS,
        fulfillmentId,
      ]
    : null;

  return useSWRImmutable<FulfillmentDetailsResponse, Error>(
    key,
    () => getFulfillmentDetails(fulfillmentId as string, authHeaders),
    {
      keepPreviousData: true,
    },
  );
}
