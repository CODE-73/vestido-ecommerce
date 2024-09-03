import useSWRMutation from 'swr/mutation';
import { useAuth } from '@vestido-ecommerce/auth/client';

import { UpdateProfileSWRKeys } from '../keys';
import { updateProfile } from './service';
import {
  UpdateProfileRequest,
  UpdateProfileResponse,
} from 'libs/auth/src/services/updateProfile';

export function useUpdateProfile() {
  const { isAuthenticated, authHeaders } = useAuth();
  const key = isAuthenticated
    ? [UpdateProfileSWRKeys.PROFILE, UpdateProfileSWRKeys.UPDATE]
    : null;

  return useSWRMutation<
    UpdateProfileResponse,
    Error,
    string[] | null,
    UpdateProfileRequest
  >(key, (_, { arg }) => updateProfile({ ...arg }, authHeaders));
}
