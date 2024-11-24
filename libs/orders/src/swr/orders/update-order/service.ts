import {
  handleVestidoErrorResponse,
  VestidoError,
} from '@vestido-ecommerce/utils';

import { UpdateOrderRequest, UpdateOrderResponse } from './types';

export async function updateOrder(
  args: UpdateOrderRequest,
  headers?: Record<string, string>,
): Promise<UpdateOrderResponse> {
  if (!args.id) {
    throw new VestidoError({
      name: 'InvalidOrderUpdateRequest',
      message: 'Missing id in payload',
      context: {
        payload: args,
      },
    });
  }
  const url = `/api/orders/${encodeURIComponent(args.id)}`;
  const method = 'PUT';

  const r = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...headers,
    },
    body: JSON.stringify(args),
  });

  if (!r) {
    await handleVestidoErrorResponse(r);
  }

  const data = await r.json();
  return data as UpdateOrderResponse;
}
