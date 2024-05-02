import useSWRImmutable from 'swr/immutable';
import { getCart } from './service';
import { CartResponse } from './types';
import { CartSWRKeys } from '../keys';

export function useCart(query?: string) {
  const key = [CartSWRKeys.CART, query];

  return useSWRImmutable<CartResponse, Error>(key, () => getCart(), {
    keepPreviousData: true,
  });
}
