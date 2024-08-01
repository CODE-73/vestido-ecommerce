import { DeleteAddressRequest, DeleteAddressResponse } from './types';

export async function addressDelete(
  args: DeleteAddressRequest,
): Promise<DeleteAddressResponse> {
  const url = `/api/addresses/${encodeURIComponent(args.addressId)}`;
  const r = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  if (!r.ok) {
    throw new Error('Error Deleting Address');
  }
  return true as DeleteAddressResponse;
}
