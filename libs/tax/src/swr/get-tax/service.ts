import { GetTaxResponse } from './types';

export async function getTax(
  taxId: string,
  authHeaders?: Record<string, string>,
): Promise<GetTaxResponse> {
  const r = await fetch(`/api/taxes/${encodeURIComponent(taxId)}`, {
    headers: {
      ...authHeaders,
    },
  });

  const data = await r.json();

  return data as GetTaxResponse;
}
