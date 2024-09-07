import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import { GenerateCategorySearchTermsResponse } from '../../../services/categories/generate-search-terms/types';

export async function getCategorySearchTerms(
  categoryId: string,
  authHeaders: Record<string, string>,
): Promise<GenerateCategorySearchTermsResponse> {
  const url = `/api/categories/${encodeURIComponent(categoryId)}/generate-search-terms`;
  const r = await fetch(url, {
    headers: {
      ...authHeaders,
    },
  });
  if (!r.ok) {
    await handleVestidoErrorResponse(r);
  }
  const data = await r.json();

  return data as GenerateCategorySearchTermsResponse;
}
