import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import { verifyPaymentRequest, verifyPaymentResponse } from '../../../services';

export async function verifyPayment(
  args: verifyPaymentRequest,
  authHeaders: Record<string, string>,
): Promise<verifyPaymentResponse> {
  const r = await fetch(`/api/payments/${args.paymentId}/verify`, {
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

  return data as verifyPaymentResponse;
}
