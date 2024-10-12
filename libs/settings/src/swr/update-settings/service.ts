import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import { UpdateSettingsRequest, UpdateSettingsResponse } from './types';

export async function updateSettings(
  args: UpdateSettingsRequest,
  headers?: Record<string, string>,
): Promise<UpdateSettingsResponse> {
  const url = `/api/settings/${encodeURIComponent(args.key)}`;

  const r = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...headers,
    },
    body: JSON.stringify(args),
  });

  if (!r) {
    await handleVestidoErrorResponse(r);
  }

  const data = await r.json();
  return data as UpdateSettingsResponse;
}
