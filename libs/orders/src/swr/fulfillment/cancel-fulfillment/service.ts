import { FulfillmentResponse } from 'libs/orders/src/services';

export async function updateFulfillmentCancelled(
  fulfillmentId: string,
  authHeaders: Record<string, string>,
): Promise<FulfillmentResponse> {
  const r = await fetch(
    `/api/fulfillments/${encodeURIComponent(fulfillmentId)}/cancel`,
    {
      method: 'POST',
      headers: {
        ...authHeaders,
        'Content-Type': 'application/json',
      },
    },
  );

  if (!r.ok) {
    console.error('Error cancelling fulfillment', await r.text());
    throw new Error('Error cancelling fulfillment');
  }

  return (await r.json()) as FulfillmentResponse;
}
