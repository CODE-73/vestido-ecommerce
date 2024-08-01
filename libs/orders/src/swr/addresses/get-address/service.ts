import { CustomerAddressResponse } from '../../../services//address/get-address/types';

export async function getAddressDetails(
  addressId: string,
): Promise<CustomerAddressResponse> {
  const url = `/api/addresses/${encodeURIComponent(addressId)}`;
  const r = await fetch(url);
  if (!r.ok) {
    throw new Error('Error Fetching Address Details');
  }
  const data = await r.json();

  return data as CustomerAddressResponse;
}
