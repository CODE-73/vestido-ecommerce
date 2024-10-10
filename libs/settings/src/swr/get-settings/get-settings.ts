import useSWRImmutable from 'swr/immutable';

import { useAuth } from '@vestido-ecommerce/auth/client';

import { SettingsSWRKeys } from '../keys';
import { getSettings } from './service';
import { GetSettingsResponse } from './types';

export const useSettings = (_key?: string | null) => {
  const { authHeaders } = useAuth();
  const key = [SettingsSWRKeys.SETTINGS, SettingsSWRKeys.DETAILS, _key];

  return useSWRImmutable<GetSettingsResponse, Error>(
    key,
    () => getSettings(_key as string, authHeaders),
    { keepPreviousData: true },
  );
};
