import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import { attributeDetailsResponse } from './types';

export async function getAttributeDetails(
  attributeId: string,
  headers?: Record<string, string>,
): Promise<attributeDetailsResponse> {
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

  return data as attributeDetailsResponse;
}
