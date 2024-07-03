import {
  RemoveFromCartRequest,
  RemoveFromCartResponse,
} from '../../../services/cart/remove-from-cart/types';

import axios from 'axios'; // Import Axios

export async function removeCartItem(
  args: RemoveFromCartRequest,
  authHeaders: Record<string, string>
): Promise<RemoveFromCartResponse> {
  try {
    const itemId = args.data.itemId;
    const r = await axios.delete(`/api/cart?itemId=${itemId}`, {
      headers: {
        ...authHeaders,
      },
    });

    return r.data as RemoveFromCartResponse;
  } catch (error) {
    console.error('Error in deleting from Cart:', error);
    throw new Error('Error in deleting from Cart');
  }
}
