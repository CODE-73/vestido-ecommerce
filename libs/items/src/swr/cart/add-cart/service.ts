import { AddToCartRequest, AddToCartResponse } from './types';

import axios from 'axios'; // Import Axios

export async function addCartItem(
  args: AddToCartRequest,
  authHeaders: Record<string, string>
): Promise<AddToCartResponse> {
  try {
    const r = await axios.post('/api/cart', args, {
      headers: {
        ...authHeaders,
      },
    });

    return r.data as AddToCartResponse;
  } catch (error) {
    console.error('Error adding to cart', error);
    throw new Error('Error adding to cart');
  }
}
