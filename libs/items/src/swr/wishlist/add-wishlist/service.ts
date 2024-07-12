import { AddToWishlistRequest, AddToWishlistResponse } from './types';

import axios from 'axios'; // Import Axios

export async function addToWishlist(
  args: AddToWishlistRequest,
  authHeaders: Record<string, string>
): Promise<AddToWishlistResponse> {
  try {
    const r = await axios.post('/api/wishlist', args, {
      headers: {
        ...authHeaders,
      },
    });
    return r.data as AddToWishlistResponse;
  } catch (error) {
    console.error('Error Fetching Wishlist:', error);
    throw new Error('Error Fetching Wishlist');
  }
}
