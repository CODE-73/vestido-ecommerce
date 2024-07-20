import {
  CreateRPOrderRequest,
  CreateRPOrderResponse,
} from 'libs/razorpay/src/services';

import axios from 'axios'; // Import Axios

export async function createNewRazorpayOrder(
  args: CreateRPOrderRequest,
  authHeaders: Record<string, string>
): Promise<CreateRPOrderResponse> {
  try {
    const r = await axios.post(
      `/api/orders/${args.data.orderId}/payment`,
      args,
      {
        headers: {
          ...authHeaders,
        },
      }
    );

    return r.data as CreateRPOrderResponse;
  } catch (error) {
    console.error('Error creating the order in Razorpay', error);
    throw new Error('Error creating the order in Razorpay');
  }
}
