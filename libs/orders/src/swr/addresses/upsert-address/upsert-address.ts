import useSWRMutation from 'swr/mutation';
import { AddressUpsertRequest, AddressUpsertResponse } from './types';
import { upsertAddress } from './service';
import { useAuth } from '@vestido-ecommerce/auth';
import { useClearCacheOnSuccess } from '@vestido-ecommerce/utils';

import { AddressUpsertSWRKeys } from '../keys';

export const useAddressUpsert = () => {
  const { authHeaders } = useAuth();
  const key = [AddressUpsertSWRKeys.ADDRESS, AddressUpsertSWRKeys.UPSERT];

  return useSWRMutation<
    AddressUpsertResponse,
    Error,
    string[] | null,
    AddressUpsertRequest
  >(key, (_, { arg }) => upsertAddress({ ...arg }, authHeaders), {
    ...useClearCacheOnSuccess(AddressUpsertSWRKeys.ADDRESS),
  });
};
