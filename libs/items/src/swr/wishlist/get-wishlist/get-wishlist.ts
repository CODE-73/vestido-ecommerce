import useSWRImmutable from 'swr/immutable';

import { useAuth } from '@vestido-ecommerce/auth/client';

import { WishlistItemResponse } from '../../../services/wishlist/get-wishlist/types';
import { WishlistSWRKeys } from '../keys';
import { getWishlist } from './service';

export function useWishlist(query?: string) {
  const { authHeaders } = useAuth();
  const key = [WishlistSWRKeys.WISHLIST, query];

  return useSWRImmutable<WishlistItemResponse, Error>(
    key,
    () => getWishlist(authHeaders),
    {
      keepPreviousData: true,
    },
  );
}
