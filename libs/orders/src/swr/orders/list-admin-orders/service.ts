import axios from 'axios'; // Import Axios

import { ListAdminOrderResponse } from '../../../services/orders/list-admin-orders/types';

export async function getAdminOrderList(
  authHeaders: Record<string, string>,
): Promise<ListAdminOrderResponse> {
  try {
    const r = await await axios.get('/api/orders', {
      headers: {
        ...authHeaders,
      },
    });
    return r.data as ListAdminOrderResponse;
  } catch (error) {
    console.error('Error Fetching Order List:', error);
    throw new Error('Error Fetching Order List');
  }
}
