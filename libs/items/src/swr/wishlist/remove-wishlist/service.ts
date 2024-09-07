import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import { RemoveFromWishlistResponse } from '../../../services/wishlist/remove-from-wishlist';
import { RemoveFromWishListSwrRequest } from './types';

export async function removeFromWishList(
  args: RemoveFromWishListSwrRequest,
  authHeaders: Record<string, string>,
): Promise<RemoveFromWishlistResponse> {
  const r = await fetch(`/api/wishlist?itemId=${args.itemId}`, {
    method: 'DELETE',
    headers: {
      ...authHeaders,
    },
  });

  if (!r.ok) {
    await handleVestidoErrorResponse(r);
  }

  const data = await r.json();
  return data as RemoveFromWishlistResponse;
}
