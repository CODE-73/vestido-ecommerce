import useSWRMutation from 'swr/mutation';

import { useAuth } from '@vestido-ecommerce/auth/client';
import { useClearCacheOnSuccess } from '@vestido-ecommerce/utils';

import { WishlistSWRKeys } from '../keys';
import { addToWishList } from './service';
import { AddToWishListRequest, AddToWishListResponse } from './types';

export const useAddToWishlist = () => {
  const { isAuthenticated, authHeaders } = useAuth();
  const key = isAuthenticated ? [WishlistSWRKeys.WISHLIST] : null;

  return useSWRMutation<
    AddToWishListResponse,
    Error,
    string[] | null,
    AddToWishListRequest
  >(key, (_, { arg }) => addToWishList({ ...arg }, authHeaders), {
    ...useClearCacheOnSuccess(WishlistSWRKeys.WISHLIST),
  });
};
