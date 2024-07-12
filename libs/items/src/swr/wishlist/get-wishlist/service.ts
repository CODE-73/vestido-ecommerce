import { WishlistItemResponse } from '../../../services/wishlist/get-wishlist/types';

import axios from 'axios';

export async function getWishlist(
  authHeaders: Record<string, string>
): Promise<WishlistItemResponse> {
  try {
    const r = await axios.get('/api/wishlist', {
      headers: {
        ...authHeaders,
      },
    });
    return r.data as WishlistItemResponse;
  } catch (error) {
    console.error('Error Fetching Wishlist:', error);
    throw new Error('Error Fetching Wishlist');
  }
}
