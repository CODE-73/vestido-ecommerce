import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import { CancelOrderRequest, CancelOrderResponse } from './types';

export async function cancelOrder(
  args: CancelOrderRequest,
  authHeaders: Record<string, string>,
): Promise<CancelOrderResponse> {
  const url = `/api/orders/${encodeURIComponent(args.orderId)}/cancel`;

  const r = await fetch(url, {
    method: 'PUT',
    headers: {
      ...authHeaders,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(args),
  });

  if (!r.ok) {
    await handleVestidoErrorResponse(r);
  }

  const data = await r.json();
  return data as CancelOrderResponse;
}
