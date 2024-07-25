import axios from 'axios'; // Import Axios

import { AddToWishListRequest, AddToWishListResponse } from './types';

export async function addToWishList(
  args: AddToWishListRequest,
  authHeaders: Record<string, string>,
): Promise<AddToWishListResponse> {
  try {
    const r = await axios.post('/api/wishlist', args, {
      headers: {
        ...authHeaders,
      },
    });
    return r.data as AddToWishListResponse;
  } catch (error) {
    console.error('Error Fetching Wishlist:', error);
    throw new Error('Error Fetching Wishlist');
  }
}
