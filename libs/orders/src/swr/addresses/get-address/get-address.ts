import useSWRImmutable from 'swr/immutable';

import { useAuth } from '@vestido-ecommerce/auth/client';

import { CustomerAddressResponse } from '../../../services/address/get-address/types';
import { GetAddressSWRKeys } from '../keys';
import { getAddressDetails } from './service';

export function useAddress(addressId?: string | null) {
  const { authHeaders } = useAuth();
  const key = addressId
    ? [GetAddressSWRKeys.ADDRESS, GetAddressSWRKeys.DETAILS, addressId]
    : null;

  return useSWRImmutable<CustomerAddressResponse, Error>(key, () =>
    getAddressDetails(addressId as string, authHeaders),
  );
}
