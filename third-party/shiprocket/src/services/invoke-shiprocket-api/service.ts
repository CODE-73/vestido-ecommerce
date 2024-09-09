import { VestidoError } from '@vestido-ecommerce/utils';

import { generateToken } from '../generate-auth-token';
import { APIRequestOptions } from './types';

const BASE_URL = 'https://apiv2.shiprocket.in/v1/external';

export async function invokeShiprocketAPI(
  endpoint: string,
  options: APIRequestOptions,
) {
  const token = await generateToken();

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    throw new VestidoError({
      name: 'ShipRocketAPIInvokationFailed',
      message: `Failed invoking ${endpoint}`,
      httpStatus: 500,
      context: {
        endpoint,
        reqBody: options.body,
        response: await response.text(),
      },
    });
  }

  return response.json();
}
