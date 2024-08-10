import axios from 'axios'; // Import Axios

import { ListOrderResponse } from '../../../services/orders/list-order/types';

export async function getOrderList(
  authHeaders: Record<string, string>,
): Promise<ListOrderResponse> {
  try {
    const r = await await axios.get('/api/orders', {
      headers: {
        ...authHeaders,
      },
    });
    return r.data as ListOrderResponse;
  } catch (error) {
    console.error('Error Fetching Order List:', error);
    throw new Error('Error Fetching Order List');
  }
}
