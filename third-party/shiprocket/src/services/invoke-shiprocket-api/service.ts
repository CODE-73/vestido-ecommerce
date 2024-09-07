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
    const errorResponse = await response.text();
    throw new Error(`Request failed: ${errorResponse}`);
  }

  return response.json();
}
