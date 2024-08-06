// import axios from 'axios'; // Import Axios

import { GetProfileResponse } from '../../../services/getProfile/types';

export async function getCurrentProfile(
  authHeaders: Record<string, string>,
): Promise<GetProfileResponse> {
  try {
    const r = await fetch('/api/me', {
      headers: {
        ...authHeaders,
      },
    });
    const data = await r.json();
    return data as GetProfileResponse;
  } catch (error) {
    console.error('Error Fetching Profile:', error);
    throw new Error('Error Fetching Profile');
  }
}
