import useSWRImmutable from 'swr/immutable';

import { useAuth } from '@vestido-ecommerce/auth/client';

import { ListAddressResponse } from '../../../services/address/list-address';
import { ListAddressSWRKeys } from '../keys';
import { getAddressList } from './service';

export function useAddresses() {
  const { isAuthenticated, authHeaders } = useAuth();
  const key = isAuthenticated
    ? [ListAddressSWRKeys.ADDRESS, ListAddressSWRKeys.LIST]
    : null;

  return useSWRImmutable<ListAddressResponse, Error>(
    key,
    () => getAddressList(authHeaders),
    {
      keepPreviousData: true,
    },
  );
}
