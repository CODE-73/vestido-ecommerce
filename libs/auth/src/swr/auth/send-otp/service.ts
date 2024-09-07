import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import { SendOtpRequest, SendOtpResponse } from './types';

export async function sendOtp(args: SendOtpRequest): Promise<SendOtpResponse> {
  const r = await fetch('/api/auth/send-otp', {
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
  return data as SendOtpResponse;
}
