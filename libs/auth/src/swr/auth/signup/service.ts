import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import { SignUpRequest, SignUpResponse } from './types';

export async function signup(args: SignUpRequest): Promise<SignUpResponse> {
  const r = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(args),
  });

  if (!r.ok) {
    await handleVestidoErrorResponse(r);
  }

  const data = await r.json();
  return data as SignUpResponse;
}
