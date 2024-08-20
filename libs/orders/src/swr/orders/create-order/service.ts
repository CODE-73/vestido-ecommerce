import axios from 'axios'; // Import Axios

import {
  CreateOrderRequest,
  CreateOrderSWRResponse,
} from '../../../services/orders/create-order/types';

export async function createNewOrder(
  args: CreateOrderRequest,
  authHeaders: Record<string, string>,
): Promise<CreateOrderSWRResponse> {
  try {
    const r = await axios.post('/api/orders', args, {
      headers: {
        ...authHeaders,
      },
    });

    return r.data as CreateOrderSWRResponse;
  } catch (error) {
    console.error('Error placing order', error);
    throw new Error('Error placing order');
  }
}
