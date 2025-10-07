import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import { VariantDetailsResponse } from './types';

export async function getVariantDetails(
  variantId: string,
  itemId: string,
  headers?: Record<string, string>,
): Promise<VariantDetailsResponse> {
  const url = `/api/items/${itemId}/variants/${encodeURIComponent(variantId)}`;
  const r = await fetch(url, {
    headers: {
      ...(headers ?? {}),
    },
  });
  if (!r.ok) {
    await handleVestidoErrorResponse(r);
  }
  const data = await r.json();

  return data as VariantDetailsResponse;
}
