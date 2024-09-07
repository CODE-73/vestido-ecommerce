import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import { variantDetailsResponse } from './types';

export async function getVariantDetails(
  variantId: string,
  itemId: string,
): Promise<variantDetailsResponse> {
  const url = `/api/items/${itemId}/variants/${encodeURIComponent(variantId)}`;
  const r = await fetch(url);
  if (!r.ok) {
    await handleVestidoErrorResponse(r);
  }
  const data = await r.json();

  return data as variantDetailsResponse;
}
