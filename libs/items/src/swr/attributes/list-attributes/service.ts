import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import { ListAttributeRequest, ListAttributeResponse } from './types';

export async function getAttributesList(
  args: ListAttributeRequest,
  headers?: Record<string, string>,
): Promise<ListAttributeResponse> {
  let url = '/api/attributes';
  if (args.q) {
    const encodedQuery = encodeURIComponent(args.q);
    url += `?q=${encodedQuery}`;
  }
  const r = await fetch(url, {
    headers: {
      ...headers,
    },
  });
  if (!r.ok) {
    await handleVestidoErrorResponse(r);
  }

  const data = await r.json();
  return data as ListAttributeResponse;
}
