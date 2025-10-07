import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import { AddToCartRequest, AddToCartResponse } from './types';

export async function addCartItem(
  args: AddToCartRequest,
  authHeaders: Record<string, string>,
): Promise<AddToCartResponse> {
  const r = await fetch('/api/cart', {
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
  return data as AddToCartResponse;
}
