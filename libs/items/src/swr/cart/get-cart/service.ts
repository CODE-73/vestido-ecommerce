import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import { CartItemResponse } from '../../../services/cart/get-cart/types';

export async function getCartItems(
  authHeaders: Record<string, string>,
): Promise<CartItemResponse> {
  const r = await fetch('/api/cart', {
    headers: {
      ...authHeaders,
    },
  });

  if (!r.ok) {
    await handleVestidoErrorResponse(r);
  }

  const data = await r.json();
  return data as CartItemResponse;
}
