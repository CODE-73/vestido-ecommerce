import {
  UpdateFulfillmentRequest,
  UpdateFulfillmentResponse,
} from 'libs/orders/src/services/fulfillment/update-fulfillment/type';

export async function submitFulfillmentDetails(
  fulfillmentId: string,
  authHeaders: Record<string, string>,
): Promise<UpdateFulfillmentResponse> {
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

  return (await r.json()) as UpdateFulfillmentResponse;
}
