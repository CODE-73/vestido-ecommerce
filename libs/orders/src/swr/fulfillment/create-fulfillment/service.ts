import axios from 'axios'; // Import Axios

import {
  CreateFulfillmentRequest,
  CreateFulfillmentResponse,
} from 'libs/orders/src/services/fulfillment/create-fulfillment';

export async function createNewFulfillment(
  args: CreateFulfillmentRequest,
  authHeaders: Record<string, string>,
): Promise<CreateFulfillmentResponse> {
  try {
    const r = await axios.post(
      `/api/orders/${encodeURIComponent(args.orderId)}/fulfillment`,
      args,
      {
        headers: {
          ...authHeaders,
        },
      },
    );

    return r.data as CreateFulfillmentResponse;
  } catch (error) {
    console.error('Error creating fulfillment', error);
    throw new Error('Error creating fulfillment');
  }
}
