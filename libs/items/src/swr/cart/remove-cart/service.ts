import { RemoveFromCartRequest, RemoveFromCartResponse } from './types';

import axios from 'axios'; // Import Axios

export async function removeFromCart(
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
    console.log('Cart items are ', r.data);
    return r.data as RemoveFromCartResponse;
  } catch (error) {
    console.error('Error in deleting from Cart:', error);
    throw new Error('Error in deleting from Cart');
  }
}