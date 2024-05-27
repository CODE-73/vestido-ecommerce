import { DeleteVariantRequest, DeleteVariantResponse } from './types';

export async function deleteVariant(
  args: DeleteVariantRequest,
  itemId: string
): Promise<DeleteVariantResponse> {
  const url = `/api/items/${itemId}/variants/${encodeURIComponent(
    args.variantId
  )}`;
  const r = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  if (!r.ok) {
    throw new Error('Error Deleting Variant');
  }
  return true as DeleteVariantResponse;
}
