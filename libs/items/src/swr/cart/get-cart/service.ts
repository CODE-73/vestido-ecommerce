import { CartResponse } from './types';

import axios from 'axios'; // Import Axios

export async function getCartItems(
  authHeaders: Record<string, string>
): Promise<CartResponse> {
  try {
    const r = await await axios.get('/api/cart', {
      headers: {
        ...authHeaders,
      },
    });
    return r.data as CartResponse;
  } catch (error) {
    console.error('Error Fetching Cart:', error);
    throw new Error('Error Fetching Cart');
  }
}
