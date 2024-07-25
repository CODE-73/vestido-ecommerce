import { AddressUpsertRequest, AddressUpsertResponse } from './types';
import axios from 'axios'; // Import Axios

export async function upsertAddress(
  args: AddressUpsertRequest,
  authHeaders: Record<string, string>,
): Promise<AddressUpsertResponse> {
  let url = '/api/addresses';
  let method = 'POST';
  const addressId = args.id;

  if (addressId) {
    url = `/api/addresses/${encodeURIComponent(addressId)}`;
    method = 'PUT';
  }
  // const r = await fetch(url, {
  //   method: method,
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Accept: 'application/json',
  //     ...authHeaders,
  //   },
  //   body: JSON.stringify(args),
  // });
  // if (!r.ok) {
  //   throw new Error('Error Upserting Item');
  // }

  // const data = await r.json();
  // return data as AddressUpsertResponse;

  try {
    const r = await axios(url, {
      method: method,
      headers: {
        ...authHeaders,
      },
      data: args,
    });
    return r.data as AddressUpsertResponse;
  } catch (error) {
    console.error('Error adding address', error);
    throw new Error('Error Adding Address');
  }
}
