import { FulfillmentResponse } from '../../../services';

export async function submitFulfillmentDetails(
  fulfillmentId: string,
  authHeaders: Record<string, string>,
): Promise<FulfillmentResponse> {
  const r = await fetch(
    `/api/fulfillments/${encodeURIComponent(fulfillmentId)}/submit`,
    {
      method: 'POST',
      headers: {
        ...authHeaders,
        'Content-Type': 'application/json',
      },
    },
  );

  if (!r.ok) {
    console.error('Error submitting fulfillment', await r.text());
    throw new Error('Error submitting fulfillment');
  }

  return (await r.json()) as FulfillmentResponse;
}
