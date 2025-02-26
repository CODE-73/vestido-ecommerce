import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import {
  UpdateReturnRequest,
  UpdateReturnSWRResponse,
} from '../../../services';

export async function updateReturn(
  args: UpdateReturnRequest,
  authHeaders: Record<string, string>,
): Promise<UpdateReturnSWRResponse> {
  const r = await fetch(`/api/return/${encodeURIComponent(args.returnId)}`, {
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

  const data = await r.json();
  return data as UpdateReturnSWRResponse;
}
