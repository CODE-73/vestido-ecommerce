import { ListAddressResponse } from '../../../services/address/list-address/types';
import axios from 'axios'; // Import Axios

export async function getAddressList(
  authHeaders: Record<string, string>
): Promise<ListAddressResponse> {
  // const r = await fetch('/api/addresses');

  // if (!r.ok) {
  //   throw new Error('Error Fetching List');
  // }

  // const data = await r.json();
  // return data as AddressListResponse;
  try {
    const r = await await axios.get('/api/addresses', {
      headers: {
        ...authHeaders,
      },
    });
    return r.data as ListAddressResponse;
  } catch (error) {
    console.error('Error Fetching Address List:', error);
    throw new Error('Error Fetching Address List');
  }
}
