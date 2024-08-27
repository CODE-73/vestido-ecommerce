import { CreateFulfillmentRequest } from 'libs/orders/src/services/fulfillment/create-fulfillment';
import { FulfillmentResponse } from 'libs/orders/src/services';

export async function createNewFulfillment(
  args: CreateFulfillmentRequest,
  authHeaders: Record<string, string>,
): Promise<FulfillmentResponse> {
  const r = await fetch(
    `/api/orders/${encodeURIComponent(args.orderId)}/fulfillments`,
    {
      method: 'POST',
      headers: {
        ...authHeaders,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(args),
    },
  );

  if (!r.ok) {
    console.error('Error creating fulfillment', await r.text());
    throw new Error('Error creating fulfillment');
  }

  return (await r.json()) as FulfillmentResponse;
}
