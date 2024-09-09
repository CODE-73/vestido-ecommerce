import useSWRMutation from 'swr/mutation';

import { useAuth } from '@vestido-ecommerce/auth/client';
import { useClearCacheOnSuccess } from '@vestido-ecommerce/utils';

import { GetAddressSWRKeys } from '../keys';
import { addressDelete } from './service';
import { DeleteAddressRequest, DeleteAddressResponse } from './types';

export function useAddressDelete() {
  const { authHeaders } = useAuth();
  const key = [GetAddressSWRKeys.ADDRESS, GetAddressSWRKeys.DETAILS];

  return useSWRMutation<
    DeleteAddressResponse,
    Error,
    string[] | null,
    Pick<DeleteAddressRequest, 'addressId'>
  >(key, (_, { arg }) => addressDelete({ ...arg }, authHeaders), {
    ...useClearCacheOnSuccess(GetAddressSWRKeys.ADDRESS),
  });
}
