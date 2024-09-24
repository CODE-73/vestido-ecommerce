import {
  handleVestidoErrorResponse,
  VestidoError,
} from '@vestido-ecommerce/utils';

import {
  FulfillmentResponse,
  UpdateFulfillmentRequest,
} from '../../../services/fulfillment/update-fulfillment/type';

export async function updateFulfillmentDetails(
  args: UpdateFulfillmentRequest,
  authHeaders: Record<string, string>,
): Promise<FulfillmentResponse> {
  if (!args.id) {
    throw new VestidoError({
      name: 'InvalidFulfillmentUpdateRequest',
      message: 'Missing id in payload',
      context: {
        payload: args,
      },
    });
  }

  const r = await fetch(`/api/fulfillments/${encodeURIComponent(args.id)}`, {
    method: 'PUT',
    headers: {
      ...authHeaders,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(args),
  });

  if (!r.ok) {
    await handleVestidoErrorResponse(r);
  }

  return (await r.json()) as FulfillmentResponse;
}
