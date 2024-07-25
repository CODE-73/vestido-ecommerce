import useSWRMutation from 'swr/mutation';

import { useAuth } from '@vestido-ecommerce/auth';
import { useClearCacheOnSuccess } from '@vestido-ecommerce/utils';

import { WishlistSWRKeys } from '../keys';
import { removeFromWishList } from './service';
import { RemoveFromWishListRequest, RemoveFromWishListResponse } from './types';

export const useRemoveFromWishlist = () => {
  const { authHeaders } = useAuth();
  const key = [WishlistSWRKeys.WISHLIST];

  return useSWRMutation<
    RemoveFromWishListResponse,
    Error,
    string[] | null,
    RemoveFromWishListRequest
  >(key, (_, { arg }) => removeFromWishList({ ...arg }, authHeaders), {
    ...useClearCacheOnSuccess(WishlistSWRKeys.WISHLIST),
  });
};
