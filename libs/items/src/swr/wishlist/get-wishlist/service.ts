import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import { WishlistItemResponse } from '../../../services/wishlist/get-wishlist/types';

export async function getWishlist(
  authHeaders: Record<string, string>,
): Promise<WishlistItemResponse> {
  const r = await fetch('/api/wishlist', {
    headers: {
      ...authHeaders,
    },
  });

  if (!r.ok) {
    await handleVestidoErrorResponse(r);
  }

  const data = await r.json();
  return data as WishlistItemResponse;
}
