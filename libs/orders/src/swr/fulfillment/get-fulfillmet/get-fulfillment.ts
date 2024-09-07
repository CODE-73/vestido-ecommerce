import useSWRImmutable from 'swr/immutable';

import { FulfillmentDetailsResponse } from '../../../services/fulfillment/get-fulfillment/types';
import { FulfillmentDetailsSWRKeys } from '../keys';
import { getFulfillmentDetails } from './service';

export function useFulfillment(fulfillmentId?: string | null) {
  const key = fulfillmentId
    ? [
        FulfillmentDetailsSWRKeys.FULFILLMENT,
        FulfillmentDetailsSWRKeys.DETAILS,
        fulfillmentId,
      ]
    : null;

  return useSWRImmutable<FulfillmentDetailsResponse, Error>(
    key,
    () => getFulfillmentDetails(fulfillmentId as string),
    {
      keepPreviousData: true,
    },
  );
}
