import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import { variantDetailsResponse } from './types';

export async function getVariantDetails(
  variantId: string,
  itemId: string,
  headers?: Record<string, string>,
): Promise<variantDetailsResponse> {
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

  return data as variantDetailsResponse;
}
