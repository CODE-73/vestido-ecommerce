import { GetSettingsResponse } from './types';

export async function getSettings(
  key: string,
  authHeaders?: Record<string, string>,
): Promise<GetSettingsResponse> {
  const r = await fetch(`/api/settings/${encodeURIComponent(key)}`, {
    headers: {
      ...authHeaders,
    },
  });

  const data = await r.json();

  return data as GetSettingsResponse;
}
