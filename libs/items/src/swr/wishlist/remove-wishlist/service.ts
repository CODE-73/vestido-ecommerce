import { RemoveFromWishListSwrRequest } from './types';
import { RemoveFromWishlistResponse } from '../../../services/wishlist/remove-from-wishlist';

import axios from 'axios';

export async function removeFromWishList(
  args: RemoveFromWishListSwrRequest,
  authHeaders: Record<string, string>
): Promise<RemoveFromWishlistResponse> {
  try {
    const itemId = args.itemId;

    const r = await axios.delete(`/api/wishlist?itemId=${itemId}`, {
      headers: {
        ...authHeaders,
      },
    });
    return r.data as RemoveFromWishlistResponse;
  } catch (error) {
    console.error('Error Fetching wishlist:', error);
    throw new Error('Error Fetching wishlist');
  }
}
