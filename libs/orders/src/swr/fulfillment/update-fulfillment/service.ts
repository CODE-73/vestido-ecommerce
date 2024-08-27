import {
  UpdateFulfillmentRequest,
  FulfillmentResponse,
} from 'libs/orders/src/services/fulfillment/update-fulfillment/type';

export async function updateFulfillmentDetails(
  args: UpdateFulfillmentRequest,
  authHeaders: Record<string, string>,
): Promise<FulfillmentResponse> {
  const r = await fetch(
    `/api/fulfillments/${encodeURIComponent(args.fulfillmentId)}`,
    {
      method: 'PUT',
      headers: {
        ...authHeaders,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(args),
    },
  );

  if (!r.ok) {
    console.error('Error updating fulfillment', await r.text());
    throw new Error('Error updating fulfillment');
  }

  return (await r.json()) as FulfillmentResponse;
}
