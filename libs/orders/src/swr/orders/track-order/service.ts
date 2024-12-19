import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import { trackOrderResponse } from './types';

export async function trackOrder(
  orderId: string,
  headers?: Record<string, string>,
): Promise<trackOrderResponse> {
  const url = `/api/orders/${encodeURIComponent(orderId)}/track`;
  const r = await fetch(url, {
    headers: {
      ...headers,
    },
  });
  if (!r.ok) {
    await handleVestidoErrorResponse(r);
  }
  const data = await r.json();

  return data as trackOrderResponse;
}
