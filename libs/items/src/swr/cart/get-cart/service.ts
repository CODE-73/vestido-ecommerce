import { CartResponse } from './types';

export async function getCart(): Promise<CartResponse> {
  const r = await fetch('/api/cart');
  if (!r.ok) {
    throw new Error('Error Fetching Cart');
  }

  const data = await r.json();
  console.log('the cart is below', data);
  return data as CartResponse;
}
