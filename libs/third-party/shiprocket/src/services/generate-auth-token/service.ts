import { getRedisClient } from './../../../../../caching/src/client';

export async function generateToken() {
  const email = process.env['SHIPROCKET_API_EMAIL'] as any;
  let token = await getToken(email);
  if (!token) {
    const args = {
      email: process.env['SHIPROCKET_API_EMAIL'],
      password: process.env['SHIPROCKET_API_PWD'],
    };
    const r = await fetch(
      'https://apiv2.shiprocket.in/v1/external/auth/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(args),
      },
    );
    if (r.ok) {
      const data = await r.json();
      token = data.token;
      console.log('Token:', token);
    } else {
      console.error('Failed to authenticate with Shiprocket:', r.statusText);
    }
  }
  await setOTP(email, token as any);
  return token;
}

export async function getToken(email: string) {
  const client = await getRedisClient();
  return client.get(makeTokenKey(email));
}

function makeTokenKey(email: string) {
  return `otp:${email}`;
}

async function setOTP(email: string, token: string) {
  const client = await getRedisClient();
  return client.set(makeTokenKey(email), token, { EX: 604800 });
}
