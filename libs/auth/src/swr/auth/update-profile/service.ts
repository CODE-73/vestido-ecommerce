import {
  UpdateProfileRequest,
  UpdateProfileResponse,
} from 'libs/auth/src/services/updateProfile';

export async function updateProfile(
  args: UpdateProfileRequest,
): Promise<UpdateProfileResponse> {
  const r = await fetch('/api/me', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(args),
  });

  if (!r.ok) {
    throw new Error('Error updateing profile');
  }

  const data = await r.json();
  return data as UpdateProfileResponse;
}
