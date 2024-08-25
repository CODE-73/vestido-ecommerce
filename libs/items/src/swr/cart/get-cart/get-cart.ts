import useSWRImmutable from 'swr/immutable';

import { useAuth } from '@vestido-ecommerce/auth/client';

import { CartItemResponse } from '../../../services/cart/get-cart';
import { CartSWRKeys } from '../keys';
import { getCartItems } from './service';

export function useCart(query?: string) {
  const { authHeaders } = useAuth();
  const key = [CartSWRKeys.CART, query];

  return useSWRImmutable<CartItemResponse, Error>(
    key,
    () => getCartItems(authHeaders),
    {
      keepPreviousData: true,
    },
  );
}
