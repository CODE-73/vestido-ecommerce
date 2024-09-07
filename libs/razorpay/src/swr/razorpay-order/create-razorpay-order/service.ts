import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import { CreateRPOrderRequest, CreateRPOrderResponse } from '../../../services';

export async function createNewRazorpayOrder(
  args: CreateRPOrderRequest,
  authHeaders: Record<string, string>,
): Promise<CreateRPOrderResponse> {
  const r = await fetch(`/api/orders/${args.razorpayData.orderId}/payments`, {
    method: 'POST',
    headers: {
      ...authHeaders,
    },
    body: JSON.stringify(args),
  });

  if (!r.ok) {
    await handleVestidoErrorResponse(r);
  }

  const data = await r.json();
  return data.data as CreateRPOrderResponse;
}
