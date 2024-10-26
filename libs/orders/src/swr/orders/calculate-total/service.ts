import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import { CalculateTotalArgs } from '../../../services';
import { CalculateTotalResponse } from './types';

export async function calculateTotal(
  args: CalculateTotalArgs,
  authHeaders: Record<string, string>,
): Promise<CalculateTotalResponse> {
  const r = await fetch('/api/orders/calculate', {
    method: 'POST',
    headers: {
      ...authHeaders,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(args),
  });

  if (!r.ok) {
    await handleVestidoErrorResponse(r);
  }

  const data = await r.json();
  return data;
}
