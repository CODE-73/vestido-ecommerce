import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import { FulfillmentListResponse } from '../../../services/fulfillment/list-fulfillment/types';

export async function getFulfillmentList(
  authHeaders: Record<string, string>,
  sortBy: string,
  sortOrder: string,
): Promise<FulfillmentListResponse> {
  const url = `/api/fulfillments?sortBy=${sortBy}&sortOrder=${sortOrder}`;
  const r = await fetch(url, {
    headers: {
      ...authHeaders,
    },
  });
  if (!r.ok) {
    await handleVestidoErrorResponse(r);
  }
  const data = await r.json();

  return data as FulfillmentListResponse;
}
