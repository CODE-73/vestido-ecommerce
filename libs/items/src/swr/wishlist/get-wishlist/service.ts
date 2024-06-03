import { WishlistResponse } from './types';

import axios from 'axios';

export async function getWishlist(
  authHeaders: Record<string, string>
): Promise<WishlistResponse> {
  try {
    const r = await axios.get('/api/wishlist', {
      headers: {
        ...authHeaders,
      },
    });
    return r.data as WishlistResponse;
  } catch (error) {
    console.error('Error Fetching Wishlist:', error);
    throw new Error('Error Fetching Wishlist');
  }
}
