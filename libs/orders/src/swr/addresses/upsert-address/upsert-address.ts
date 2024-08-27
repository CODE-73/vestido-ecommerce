import useSWRMutation from 'swr/mutation';

import { useAuth } from '@vestido-ecommerce/auth/client';
import { useClearCacheOnSuccess } from '@vestido-ecommerce/utils';

import { AddressUpsertSWRKeys } from '../keys';
import { upsertAddress } from './service';
import { AddressUpsertRequest, AddressUpsertResponse } from './types';

export const useAddressUpsert = () => {
  const { isAuthenticated, authHeaders } = useAuth();
  const key = isAuthenticated
    ? [AddressUpsertSWRKeys.ADDRESS, AddressUpsertSWRKeys.UPSERT]
    : null;

  return useSWRMutation<
    AddressUpsertResponse,
    Error,
    string[] | null,
    AddressUpsertRequest
  >(key, (_, { arg }) => upsertAddress({ ...arg }, authHeaders), {
    ...useClearCacheOnSuccess(AddressUpsertSWRKeys.ADDRESS),
  });
};
