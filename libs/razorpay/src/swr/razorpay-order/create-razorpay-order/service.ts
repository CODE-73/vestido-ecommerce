import axios from 'axios';

import { CreateRPOrderRequest, CreateRPOrderResponse } from '../../../services';

export async function createNewRazorpayOrder(
  args: CreateRPOrderRequest,
  authHeaders: Record<string, string>,
): Promise<CreateRPOrderResponse> {
  try {
    const r = await axios.post(
      `/api/orders/${args.razorpayData.orderId}/payments`,
      args,
      {
        headers: {
          ...authHeaders,
        },
      },
    );

    return r.data.data as CreateRPOrderResponse;
  } catch (error) {
    console.error('Error creating the order in Razorpay', error);
    throw new Error('Error creating the order in Razorpay');
  }
}
