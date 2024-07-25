import axios from 'axios'; // Import Axios

import { RemoveFromWishListRequest, RemoveFromWishListResponse } from './types';

export async function removeFromWishList(
  args: RemoveFromWishListRequest,
  authHeaders: Record<string, string>,
): Promise<RemoveFromWishListResponse> {
  try {
    const itemId = args.data.itemId;

    const r = await axios.delete(`/api/wishlist?itemId=${itemId}`, {
      headers: {
        ...authHeaders,
      },
    });
    return r.data as RemoveFromWishListResponse;
  } catch (error) {
    console.error('Error Fetching wishlist:', error);
    throw new Error('Error Fetching wishlist');
  }
}
