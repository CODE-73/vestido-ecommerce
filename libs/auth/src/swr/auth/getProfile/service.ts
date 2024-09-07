import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import { GetProfileResponse } from '../../../services/getProfile/types';

export async function getCurrentProfile(
  authHeaders: Record<string, string>,
): Promise<GetProfileResponse> {
  const r = await fetch('/api/me', {
    headers: {
      ...authHeaders,
    },
  });
  if (!r.ok) {
    await handleVestidoErrorResponse(r);
  }

  const data = await r.json();
  return data as GetProfileResponse;
}
