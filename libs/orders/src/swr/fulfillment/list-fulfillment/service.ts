import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import { ListFulfillmentRequest } from '../../../services/fulfillment/list-fulfillment/types';
import { FulfillmentListResponse } from './types';

export async function getFulfillmentList(
  authHeaders: Record<string, string>,
  args?: ListFulfillmentRequest,
): Promise<FulfillmentListResponse> {
  // Construct the query string
  const params = new URLSearchParams({
    ...(args?.fulfillmentStatus?.length
      ? { orderStatus: args.fulfillmentStatus.join(',') }
      : {}),
    ...(args?.q ? { q: args.q } : {}),
    ...(args?.start ? { start: args.start.toString() } : {}),
    ...(args?.limit ? { limit: args.limit.toString() } : {}),
  });

  if (args?.orderBy && args.orderBy.length > 0) {
    const orderByValue = args.orderBy
      .map((field) => `${field.column}:${field.direction}`)
      .join(',');
    params.append('orderBy', orderByValue);
  }

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
