import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import { DeleteTaxRequest, DeleteTaxResponse } from './types';

export async function deleteTax(
  args: DeleteTaxRequest,
  authHeaders: Record<string, string>,
): Promise<DeleteTaxResponse> {
  const r = await fetch(`/api/taxes/${encodeURIComponent(args.taxId)}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...authHeaders,
    },
  });

  if (!r) {
    await handleVestidoErrorResponse(r);
  }

  const data = await r.json();
  return data as DeleteTaxResponse;
}
