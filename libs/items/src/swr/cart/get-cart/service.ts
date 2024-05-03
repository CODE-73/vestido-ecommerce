import { CartResponse } from './types';

import axios from 'axios'; // Import Axios

export async function getCart(
  authHeaders: Record<string, string>
): Promise<CartResponse> {
  try {
    const r = await await axios.get('/api/cart', {
      headers: {
        ...authHeaders,
      },
    });
    console.log('the cart is below', r.data);
    return r.data as CartResponse;
  } catch (error) {
    console.error('Error Fetching Cart:', error);
    throw new Error('Error Fetching Cart');
  }
}
//   if (!r.ok) {
//     throw new Error('Error Fetching Cart');
//   }

//   const data = await r.json();
//   console.log('the cart is below', data);
//   return data as CartResponse;
// }
