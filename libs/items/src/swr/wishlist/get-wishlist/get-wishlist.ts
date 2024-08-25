import useSWRImmutable from 'swr/immutable';

import { useAuth } from '@vestido-ecommerce/auth/client';

import { WishlistItemResponse } from '../../../services/wishlist/get-wishlist/types';
import { WishlistSWRKeys } from '../keys';
import { getWishlist } from './service';

export function useWishlist() {
  const { isAuthenticated, authHeaders } = useAuth();
  const key = isAuthenticated ? [WishlistSWRKeys.WISHLIST] : null;

  return useSWRImmutable<WishlistItemResponse, Error>(
    key,
    () => getWishlist(authHeaders),
    {
      keepPreviousData: true,
    },
  );
}
