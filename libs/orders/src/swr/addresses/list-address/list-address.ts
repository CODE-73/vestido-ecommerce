import useSWRImmutable from 'swr/immutable';
import { ListAddressSWRKeys } from '../keys';
import { ListAddressResponse } from '../../../services/address/list-address';
import { getAddressList } from './service';
import { useAuth } from '@vestido-ecommerce/auth';

export function useAddresses() {
  const { authHeaders } = useAuth();
  const key = [ListAddressSWRKeys.ADDRESS, ListAddressSWRKeys.LIST];

  return useSWRImmutable<ListAddressResponse, Error>(
    key,
    () => getAddressList(authHeaders),
    {
      keepPreviousData: true,
    }
  );
}
