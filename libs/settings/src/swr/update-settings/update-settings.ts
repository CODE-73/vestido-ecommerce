import useSWRMutation from 'swr/mutation';

import { useAuth } from '@vestido-ecommerce/auth/client';
import { useClearCacheOnSuccess } from '@vestido-ecommerce/utils';

import { SettingsSWRKeys } from '../keys';
import { updateSettings } from './service';
import { UpdateSettingsRequest, UpdateSettingsResponse } from './types';

export const useUpdateSettings = () => {
  const { authHeaders } = useAuth();
  const key = [SettingsSWRKeys.SETTINGS, SettingsSWRKeys.UPDATE];

  return useSWRMutation<
    UpdateSettingsResponse,
    Error,
    string[] | null,
    UpdateSettingsRequest
  >(key, (_, { arg }) => updateSettings({ ...arg }, authHeaders), {
    ...useClearCacheOnSuccess(SettingsSWRKeys.SETTINGS),
  });
};
