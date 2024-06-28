import { CreateOrderRequest, CreateOrderResponse } from './types';

import axios from 'axios'; // Import Axios

export async function createOrder(
  args: CreateOrderRequest,
  authHeaders: Record<string, string>
): Promise<CreateOrderResponse> {
  try {
    const r = await axios.post('/api/orders', args, {
      headers: {
        ...authHeaders,
      },
    });

    return r.data as CreateOrderResponse;
  } catch (error) {
    console.error('Error placing order', error);
    throw new Error('Error placing order');
  }
}
