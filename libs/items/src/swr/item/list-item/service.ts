import { ItemListResponse } from './types';

export async function getItemList(query?: string): Promise<ItemListResponse> {
  // query?: string

  // The query parameter should be optional to handle cases when there is no search term.
  // let url = '/api/items';

  // Now we check if there is a query and append it to the URL if it exists.

  // if (query) {
  //   const encodedQuery = encodeURIComponent(query);
  //   url += `&filters=[["name", "like", "%${encodedQuery}%"]]`;
  // }

  const r = await fetch('/api/items');
  if (!r.ok) {
    throw new Error('Error Fetching List');
  }

  const data = await r.json();
  console.log('the item list is below', data);
  return data as ItemListResponse;
}
