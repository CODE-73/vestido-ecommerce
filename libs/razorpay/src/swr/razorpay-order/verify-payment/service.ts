import {
  verifyPaymentRequest,
  verifyPaymentResponse,
} from 'libs/razorpay/src/services';

import axios from 'axios'; // Import Axios

export async function verifyPayment(
  args: verifyPaymentRequest,
  authHeaders: Record<string, string>,
): Promise<verifyPaymentResponse> {
  try {
    const r = await axios.post(`/api/payment/${args.paymentId}`, args, {
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
