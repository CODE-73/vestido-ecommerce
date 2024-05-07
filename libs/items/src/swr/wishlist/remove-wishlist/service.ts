import { RemoveFromWishlistRequest, RemoveFromWishlistResponse } from './types';

import axios from 'axios'; // Import Axios

export async function removeFromWishlist(
  args: RemoveFromWishlistRequest,
  authHeaders: Record<string, string>
): Promise<RemoveFromWishlistResponse> {
  try {
    const itemId = args.data.itemId;

    const r = await axios.delete(`/api/wishlist?itemId=${itemId}`, {
      headers: {
        ...authHeaders,
      },
    });
    console.log('the wishlist is below', r.data);
    return r.data as RemoveFromWishlistResponse;
  } catch (error) {
    console.error('Error Fetching wishlist:', error);
    throw new Error('Error Fetching wishlist');
  }
}
