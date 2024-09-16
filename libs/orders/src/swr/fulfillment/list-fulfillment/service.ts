import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import { FulfillmentListResponse } from '../../../services/fulfillment/list-fulfillment/types';

export async function getFulfillmentList(
  headers?: Record<string, string>,
): Promise<FulfillmentListResponse> {
  const url = '/api/fulfillments';
  const r = await fetch(url, {
    headers: {
      ...headers,
    },
  });
  if (!r.ok) {
    await handleVestidoErrorResponse(r);
  }
  const data = await r.json();

  return data as FulfillmentListResponse;
}
