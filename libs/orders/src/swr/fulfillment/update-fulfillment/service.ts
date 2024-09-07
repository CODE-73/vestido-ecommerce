import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import {
  FulfillmentResponse,
  UpdateFulfillmentRequest,
} from '../../../services/fulfillment/update-fulfillment/type';

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
    await handleVestidoErrorResponse(r);
  }

  return (await r.json()) as FulfillmentResponse;
}
