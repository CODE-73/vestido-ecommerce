import axios from 'axios'; // Import Axios

import { RemoveFromCartResponse } from '../../../services/cart/remove-from-cart/types';
import { RemoveFromCartSWRRequest } from './types';

export async function removeCartItem(
  args: RemoveFromCartSWRRequest,
  authHeaders: Record<string, string>,
): Promise<RemoveFromCartResponse> {
  try {
    const params = new URLSearchParams();
    params.append('itemId', args.itemId);
    if (args.variantId) {
      params.append('variantId', args.variantId);
    }

    params.append('actionType', args.actionType);

    const r = await axios.delete(`/api/cart?${params.toString()}`, {
      headers: {
        ...authHeaders,
      },
    });

    return r.data as RemoveFromCartResponse;
  } catch (error) {
    console.error('Error in deleting from Cart:', error);
    throw new Error('Error in deleting from Cart');
  }
}
