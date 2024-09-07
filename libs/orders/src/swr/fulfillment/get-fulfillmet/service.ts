import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import { FulfillmentDetailsResponse } from '../../../services/fulfillment/get-fulfillment/types';

export async function getFulfillmentDetails(
  fulfillmentId: string,
): Promise<FulfillmentDetailsResponse> {
  const url = `/api/fulfillments/${encodeURIComponent(fulfillmentId)}`;
  const r = await fetch(url);
  if (!r.ok) {
    await handleVestidoErrorResponse(r);
  }
  const data = await r.json();

  return data as FulfillmentDetailsResponse;
}
