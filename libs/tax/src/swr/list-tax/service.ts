import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import { ListTaxArgs } from '../../services';
import { ListTaxResponse } from './types';

export async function listTax(
  args: ListTaxArgs,
  authHeaders?: Record<string, string>,
): Promise<ListTaxResponse> {
  let url = '/api/taxes';
  if (args.q) {
    const encodedQuery = encodeURIComponent(args.q);
    url += `?q=${encodedQuery}`;
  }
  const r = await fetch(url, {
    headers: {
      ...authHeaders,
    },
  });

  if (!r.ok) {
    await handleVestidoErrorResponse(r);
  }
  const data = await r.json();

  return data as ListTaxResponse;
}
