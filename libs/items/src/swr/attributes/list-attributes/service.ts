import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import { ListAttributesRequest } from '../../../services/attributes/list-attributes/types';
import { AttributeListResponse } from './types';

export async function getAttributesList(
  args: ListAttributesRequest,
  headers?: Record<string, string>,
): Promise<AttributeListResponse> {
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
  return data as AttributeListResponse;
}
