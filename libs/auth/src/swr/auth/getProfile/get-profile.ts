import useSWRImmutable from 'swr/immutable';

import { useAuth } from '../../../providers';
import { GetProfileResponse } from '../../../services/getProfile/types';
import { GetProfileSWRKeys } from '../keys';
import { getCurrentProfile } from './service';

export function useProfile() {
  const { isAuthenticated, authHeaders } = useAuth();
  const key = isAuthenticated
    ? [GetProfileSWRKeys.PROFILE, GetProfileSWRKeys.DETAILS]
    : null;

  return useSWRImmutable<GetProfileResponse, Error>(key, () =>
    getCurrentProfile(authHeaders),
  );
}
