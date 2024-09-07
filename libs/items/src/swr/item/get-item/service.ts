import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import { ItemDetailsResponse } from '../../../services/items/get-item/types';

export async function getItemDetails(
  itemId: string,
  headers?: Record<string, string>,
): Promise<ItemDetailsResponse> {
  const url = `/api/items/${encodeURIComponent(itemId)}`;
  const r = await fetch(url, {
    headers: {
      ...(headers ?? {}),
    },
  });
  if (!r.ok) {
    await handleVestidoErrorResponse(r);
  }
  const data = await r.json();

  return data as ItemDetailsResponse;
}
