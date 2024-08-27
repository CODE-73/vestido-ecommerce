import useSWRImmutable from 'swr/immutable';

import { useAuth } from '@vestido-ecommerce/auth/client';

import { CartItemResponse } from '../../../services/cart/get-cart';
import { CartSWRKeys } from '../keys';
import { getCartItems } from './service';

export function useCart() {
  const { isAuthenticated, authHeaders } = useAuth();
  const key = isAuthenticated ? [CartSWRKeys.CART] : null;

  return useSWRImmutable<CartItemResponse, Error>(key, () =>
    getCartItems(authHeaders),
  );
}
