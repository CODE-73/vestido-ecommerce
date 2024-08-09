import axios from 'axios'; // Import Axios

import { verifyPaymentRequest, verifyPaymentResponse } from '../../../services';

export async function verifyPayment(
  args: verifyPaymentRequest,
  authHeaders: Record<string, string>,
): Promise<verifyPaymentResponse> {
  try {
    const r = await axios.post(`/api/payments/${args.paymentId}`, args, {
      headers: {
        ...authHeaders,
      },
    });
    return r.data;
  } catch (error) {
    console.error('Error in Verifying Payment', error);
    throw new Error('Error in Verifying Payment');
  }
}
