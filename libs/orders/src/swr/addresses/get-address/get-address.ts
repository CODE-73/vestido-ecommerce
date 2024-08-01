import useSWRImmutable from 'swr/immutable';

import { CustomerAddressResponse } from '../../../services/address/get-address/types';
import { GetAddressSWRKeys } from '../keys';
import { getAddressDetails } from './service';

export function useAddress(addressId?: string | null) {
  const key = addressId
    ? [GetAddressSWRKeys.ADDRESS, GetAddressSWRKeys.DETAILS, addressId]
    : null;

  return useSWRImmutable<CustomerAddressResponse, Error>(
    key,
    () => getAddressDetails(addressId as string),
    {
      keepPreviousData: true,
    },
  );
}
