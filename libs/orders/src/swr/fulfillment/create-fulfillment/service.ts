import {
  CreateFulfillmentRequest,
  CreateFulfillmentResponse,
} from 'libs/orders/src/services/fulfillment/create-fulfillment';

export async function createNewFulfillment(
  args: CreateFulfillmentRequest,
  authHeaders: Record<string, string>,
): Promise<CreateFulfillmentResponse> {
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

  return (await r.json()) as CreateFulfillmentResponse;
}
