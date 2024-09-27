import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import { DeleteCategoryRequest, DeleteCategoryResponse } from './types';

export async function deleteCategory(
  args: DeleteCategoryRequest,
  headers?: Record<string, string>,
): Promise<DeleteCategoryResponse> {
  const url = `/api/categories/${encodeURIComponent(args.categoryId)}`;
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

  return true as DeleteCategoryResponse;
}
