import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import { AddToWishListRequest, AddToWishListResponse } from './types';

export async function addToWishList(
  args: AddToWishListRequest,
  authHeaders: Record<string, string>,
): Promise<AddToWishListResponse> {
  const r = await fetch('/api/wishlist', {
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
  return data as AddToWishListResponse;
}
