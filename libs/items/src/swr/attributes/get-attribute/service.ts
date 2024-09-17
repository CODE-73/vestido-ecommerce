import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import { GetAttributeResponse } from './types';

export async function getAttribute(
  attributeId: string,
  headers?: Record<string, string>,
): Promise<GetAttributeResponse> {
  const url = `/api/attributes/${encodeURIComponent(attributeId)}`;
  const r = await fetch(url, {
    headers: {
      ...headers,
    },
  });
  if (!r.ok) {
    await handleVestidoErrorResponse(r);
  }
  const data = await r.json();

  return data as GetAttributeResponse;
}
