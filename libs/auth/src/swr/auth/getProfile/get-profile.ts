import useSWRImmutable from 'swr/immutable';

import { useAuth } from '../../../providers';
import { GetProfileResponse } from '../../../services/getProfile/types';
import { GetProfileSWRKeys } from '../keys';
import { getCurrentProfile } from './service';

export function useProfile() {
  const { authHeaders } = useAuth();
  const key = [GetProfileSWRKeys.PROFILE, GetProfileSWRKeys.DETAILS];

  return useSWRImmutable<GetProfileResponse, Error>(
    key,
    () => getCurrentProfile(authHeaders),
    {
      keepPreviousData: true,
    },
  );
}
