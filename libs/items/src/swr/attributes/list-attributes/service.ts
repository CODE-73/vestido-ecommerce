import { AttributeListResponse } from './types';
import { ListAttributesRequest } from '../../../services/attributes/list-attributes/types';

export async function getAttributesList(
  args: ListAttributesRequest,
): Promise<AttributeListResponse> {
  let url = '/api/attributes';
  if (args.q) {
    const encodedQuery = encodeURIComponent(args.q);
    url += `?q=${encodedQuery}`;
  }
  const r = await fetch(url);
  if (!r.ok) {
    throw new Error('Error Fetching List');
  }

  const data = await r.json();
  return data as AttributeListResponse;
}
