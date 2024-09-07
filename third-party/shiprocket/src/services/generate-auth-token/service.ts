import { getRedisClient } from '@vestido-ecommerce/caching';
import { VestidoError } from '@vestido-ecommerce/utils';

export async function generateToken() {
  const email = process.env['SHIPROCKET_API_EMAIL'] as string;
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
      throw new VestidoError({
        name: 'ShiprocketAuthenticationError',
        message: 'Failed to authenticate with Shiprocket',
        httpStatus: 500,
        context: {
          status: r.status,
          statusText: r.statusText,
          body: await r.text(),
          url: r.url,
          headers: r.headers,
        },
      });
    }
  }

  await setOTP(email, token as string);
  return token;
}

export async function getToken(email: string) {
  const client = await getRedisClient();
  return client.get(makeTokenKey(email));
}

function makeTokenKey(email: string) {
  return `shiprocket-otp:${email}`;
}

async function setOTP(email: string, token: string) {
  const client = await getRedisClient();
  return client.set(makeTokenKey(email), token, { EX: 604800 });
}
