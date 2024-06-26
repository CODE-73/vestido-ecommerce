import { wishlistItemsResponse } from '@vestido-ecommerce/items';

import axios from 'axios';

export async function getWishlist(
  authHeaders: Record<string, string>
): Promise<wishlistItemsResponse> {
  try {
    const r = await axios.get('/api/wishlist', {
      headers: {
        ...authHeaders,
      },
    });
    return r.data as wishlistItemsResponse;
  } catch (error) {
    console.error('Error Fetching Wishlist:', error);
    throw new Error('Error Fetching Wishlist');
  }
}
