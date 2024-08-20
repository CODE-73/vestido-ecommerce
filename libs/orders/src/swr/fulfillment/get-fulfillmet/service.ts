import { FulfillmentDetailsResponse } from './../../../../../orders/src/services/fulfillment/get-fulfillment/types';

export async function getFulfillmentDetails(
  fulfillmentId: string,
): Promise<FulfillmentDetailsResponse> {
  const url = `/api/items/${encodeURIComponent(fulfillmentId)}`;
  const r = await fetch(url);
  if (!r.ok) {
    throw new Error('Error Fetching flfillment Details');
  }
  const data = await r.json();

  return data as FulfillmentDetailsResponse;
}
