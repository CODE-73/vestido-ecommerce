import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import { FulfillmentListResponse } from '../../../services/fulfillment/list-fulfillment/types';

export async function getFulfillmentList(
  authHeaders: Record<string, string>,
  sortBy: string,
  sortOrder: string,
  fulfillmentStatus: string[],
): Promise<FulfillmentListResponse> {
  const params = new URLSearchParams({
    sortBy,
    sortOrder,
    ...(fulfillmentStatus?.length
      ? { fulfillmentStatus: fulfillmentStatus.join(',') }
      : {}),
  });

  const url = `/api/fulfillments?${params.toString()}`;

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
