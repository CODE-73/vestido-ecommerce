import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import { AddCartRequest, AddCartResponse } from './types';

export async function addCartItem(
  args: AddCartRequest,
  authHeaders: Record<string, string>,
): Promise<AddCartResponse> {
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
  return data as AddCartResponse;
}
