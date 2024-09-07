import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import { DeleteAttributeRequest, DeleteAttributeResponse } from './types';

export async function deleteAttribute(
  args: DeleteAttributeRequest,
  headers?: Record<string, string>,
): Promise<DeleteAttributeResponse> {
  const url = `/api/attributes/${encodeURIComponent(args.attributeId)}`;
  const r = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...headers,
    },
  });
  if (!r.ok) {
    await handleVestidoErrorResponse(r);
  }
  return true as DeleteAttributeResponse;
}
