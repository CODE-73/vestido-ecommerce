import axios from 'axios'; // Import Axios

import {
  CreateCODRequest,
  CreateCODResponse,
} from './../../services/cod/types';

export async function createNewCOD(
  args: CreateCODRequest,
  authHeaders: Record<string, string>,
): Promise<CreateCODResponse> {
  try {
    const r = await axios.post(`/api/orders/${args.orderId}/cod`, args, {
      headers: {
        ...authHeaders,
      },
    });
    return r.data.paymentId as CreateCODResponse;
  } catch (error) {
    console.error('Error creating COD Payment ID ', error);
    throw new Error('Error creating COD Payment ID ');
  }
}
