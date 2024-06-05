import { LoginRequest, LoginResponse } from './types';

export async function login(args: LoginRequest): Promise<LoginResponse> {
  const r = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(args),
  });

  if (!r.ok) {
    throw new Error('Error logging in');
  }

  const data = await r.json();
  return data as LoginResponse;
}
