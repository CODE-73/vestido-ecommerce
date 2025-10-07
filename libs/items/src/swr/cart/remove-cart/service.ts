import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import { RemoveFromCartRequest, RemoveFromCartResponse } from './types';

export async function removeCartItem(
  args: RemoveFromCartRequest,
  authHeaders: Record<string, string>,
): Promise<RemoveFromCartResponse> {
  const params = new URLSearchParams();
  params.append('itemId', args.itemId);
  if (args.variantId) {
    params.append('variantId', args.variantId);
  }

  params.append('actionType', args.actionType);
  const r = await fetch(`/api/cart?${params.toString()}`, {
    method: 'DELETE',
    headers: {
      ...authHeaders,
    },
  });
  if (!r.ok) {
    await handleVestidoErrorResponse(r);
  }

  const data = await r.json();
  return data as RemoveFromCartResponse;
}
