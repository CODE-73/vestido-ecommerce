import {
  CreateOrderRequest,
  CreateOrderResponse,
} from '../../../services/orders/create-order/types';

import axios from 'axios'; // Import Axios

export async function createNewOrder(
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
