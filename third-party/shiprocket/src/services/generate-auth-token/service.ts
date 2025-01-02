import { createHash } from 'crypto';

import { getRedisClient } from '@vestido-ecommerce/caching';
import { VestidoError } from '@vestido-ecommerce/utils';

const SHIPROCKET_API_EMAIL = process.env['SHIPROCKET_API_EMAIL'] as string;
const SHIPROCKET_API_PWD = process.env['SHIPROCKET_API_PWD'] as string;

export async function generateToken() {
  let token = await getTokenFromCache();
  if (!token) {
    const args = {
      email: SHIPROCKET_API_EMAIL,
      password: SHIPROCKET_API_PWD,
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
      await updateTokenCache(token as string);
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

  return token;
}

export async function getTokenFromCache() {
  const client = await getRedisClient();
  return client.get(makeTokenKey());
}

function makeTokenKey() {
  const pwdHash = createHash('sha256').update(SHIPROCKET_API_PWD).digest('hex');
  return `shiprocket-otp:${SHIPROCKET_API_EMAIL}:${pwdHash}`;
}

async function updateTokenCache(token: string) {
  const client = await getRedisClient();
  return client.set(makeTokenKey(), token, { EX: 604800 });
}
