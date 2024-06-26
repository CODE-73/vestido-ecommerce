import useSWRImmutable from 'swr/immutable';
import { getCartItems } from './service';
import { CartResponse } from './types';
import { CartSWRKeys } from '../keys';
import { useAuth } from '@vestido-ecommerce/auth';

export function useCart(query?: string) {
  const { authHeaders } = useAuth();
  const key = [CartSWRKeys.CART, query];

  return useSWRImmutable<CartResponse, Error>(
    key,
    () => getCartItems(authHeaders),
    {
      keepPreviousData: true,
    }
  );
}
