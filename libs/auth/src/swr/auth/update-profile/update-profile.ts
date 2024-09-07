import useSWRMutation from 'swr/mutation';

import { useAuth } from '../../../providers';
import {
  UpdateProfileRequest,
  UpdateProfileResponse,
} from '../../../services/updateProfile';
import { UpdateProfileSWRKeys } from '../keys';
import { updateProfile } from './service';

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
