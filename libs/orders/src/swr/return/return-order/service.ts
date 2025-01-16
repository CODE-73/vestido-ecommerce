import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';
import {
  ReturnOrderRequest,
  ReturnOrderSWRResponse,
} from 'libs/orders/src/services';

export async function returnOrder(
  args: ReturnOrderRequest,
  authHeaders: Record<string, string>,
): Promise<ReturnOrderSWRResponse> {
  const r = await fetch(`/api/orders/${args.orderId}/return`, {
    method: 'POST',
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
  return data as ReturnOrderSWRResponse;
}
