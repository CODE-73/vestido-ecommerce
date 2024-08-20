import axios from 'axios'; // Import Axios

import {
  UpdateFulfillmentRequest,
  UpdateFulfillmentResponse,
} from 'libs/orders/src/services/fulfillment/update-fulfillment/type';

export async function submitFulfillmentDetails(
  args: UpdateFulfillmentRequest,
  authHeaders: Record<string, string>,
): Promise<UpdateFulfillmentResponse> {
  try {
    const r = await axios.put(
      `/api/fulfillment/${encodeURIComponent(args.fulfillmentId)}/submit`,
      args,
      {
        headers: {
          ...authHeaders,
        },
      },
    );

    return r.data as UpdateFulfillmentResponse;
  } catch (error) {
    throw new Error('Error submitting fulfillment');
  }
}
