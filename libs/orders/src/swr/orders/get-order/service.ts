import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import { GetOrderResponse } from '../../../services/orders/get-order';

export async function getOrderDetails(
  orderId: string,
): Promise<GetOrderResponse> {
  const url = `/api/orders/${encodeURIComponent(orderId)}`;
  const r = await fetch(url);
  if (!r.ok) {
    await handleVestidoErrorResponse(r);
  }
  const data = await r.json();

  return data as GetOrderResponse;
}
