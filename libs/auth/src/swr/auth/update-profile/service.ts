import {
  UpdateProfileRequest,
  UpdateProfileResponse,
} from 'libs/auth/src/services/updateProfile';

export async function updateProfile(
  args: UpdateProfileRequest,
  authHeaders: Record<string, string>,
): Promise<UpdateProfileResponse> {
  const r = await fetch('/api/me', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...authHeaders,
    },
    body: JSON.stringify(args),
  });

  if (!r.ok) {
    throw new Error('Error updateing profile');
  }

  const data = await r.json();
  return data as UpdateProfileResponse;
}
