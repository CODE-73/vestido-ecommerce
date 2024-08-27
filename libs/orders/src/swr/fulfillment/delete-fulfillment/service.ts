import { FulfillmentResponse } from 'libs/orders/src/services';

export async function deleteFulfillmentDetails(
  fulfillmentId: string,
  authHeaders: Record<string, string>,
): Promise<FulfillmentResponse> {
  const r = await fetch(
    `/api/fulfillments/${encodeURIComponent(fulfillmentId)}`,
    {
      method: 'DELETE',
      headers: {
        ...authHeaders,
        'Content-Type': 'application/json',
      },
    },
  );

  if (!r.ok) {
    console.error('Error deleting fulfillment', await r.text());
    throw new Error('Error deleting fulfillment');
  }

  return (await r.json()) as FulfillmentResponse;
}
