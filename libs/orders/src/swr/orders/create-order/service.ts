import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import {
  CreateOrderRequest,
  CreateOrderSWRResponse,
} from '../../../services/orders/create-order/types';

export async function createNewOrder(
  args: CreateOrderRequest,
  authHeaders: Record<string, string>,
): Promise<CreateOrderSWRResponse> {
  const r = await fetch('/api/orders', {
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
  return data as CreateOrderSWRResponse;
}
