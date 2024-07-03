import { AddCartRequest, AddCartResponse } from './types';

import axios from 'axios'; // Import Axios

export async function addCartItem(
  args: AddCartRequest,
  authHeaders: Record<string, string>
): Promise<AddCartResponse> {
  try {
    const r = await axios.post('/api/cart', args, {
      headers: {
        ...authHeaders,
      },
    });

    return r.data as AddCartResponse;
  } catch (error) {
    console.error('Error adding to cart', error);
    throw new Error('Error adding to cart');
  }
}
