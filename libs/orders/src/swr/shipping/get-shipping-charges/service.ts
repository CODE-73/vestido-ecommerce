import axios from 'axios'; // Import Axios

import {
  shippingChargesRequest,
  shippingChargesResponse,
} from '../../../services/shipping/get-shipping-charge/types';

export async function getShipping(
  args: shippingChargesRequest,
  authHeaders: Record<string, string>,
): Promise<shippingChargesResponse> {
  try {
    const r = await axios.post('/api/shipping/calculate', args, {
      headers: {
        ...authHeaders,
      },
    });

    return r.data as shippingChargesResponse;
  } catch (error) {
    console.error('Error getting shipping charges', error);
    throw new Error('Error getting shipping charges');
  }
}
