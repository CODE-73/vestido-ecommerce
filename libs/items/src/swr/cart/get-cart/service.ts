import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import { GetCartResponse } from './types';

export async function getCartItems(
  authHeaders: Record<string, string>,
): Promise<GetCartResponse> {
  const r = await fetch('/api/cart', {
    headers: {
      ...authHeaders,
    },
  });

  if (!r.ok) {
    await handleVestidoErrorResponse(r);
  }

  const data = await r.json();
  return data as GetCartResponse;
}
