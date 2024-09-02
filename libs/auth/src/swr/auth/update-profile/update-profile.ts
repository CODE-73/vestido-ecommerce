import useSWRMutation from 'swr/mutation';

import { UpdateProfileSWRKeys } from '../keys';
import { updateProfile } from './service';
import {
  UpdateProfileRequest,
  UpdateProfileResponse,
} from 'libs/auth/src/services/updateProfile';

export function useUpdateProfile() {
  const key = [UpdateProfileSWRKeys.PROFILE, UpdateProfileSWRKeys.UPDATE];

  return useSWRMutation<
    UpdateProfileResponse,
    Error,
    string[] | null,
    UpdateProfileRequest
  >(key, (_, { arg }) => updateProfile({ ...arg }));
}
