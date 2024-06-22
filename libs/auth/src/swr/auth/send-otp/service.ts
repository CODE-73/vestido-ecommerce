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
    throw new Error('Error sending OTP');
  }

  const data = await r.json();
  console.log('OTP sent successfully', data);
  return data as SendOtpResponse;
}
