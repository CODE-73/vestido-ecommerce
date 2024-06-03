import { AddToCartRequest, AddToCartResponse } from './types';

import axios from 'axios'; // Import Axios

export async function addToCart(
  args: AddToCartRequest,
  authHeaders: Record<string, string>
): Promise<AddToCartResponse> {
  try {
    const r = await axios.post('/api/cart', args.data, {
      headers: {
        ...authHeaders,
      },
    });

    return r.data as AddToCartResponse;
  } catch (error) {
    console.error('Error Fetching Cart:', error);
    throw new Error('Error Fetching Cart');
  }
}
