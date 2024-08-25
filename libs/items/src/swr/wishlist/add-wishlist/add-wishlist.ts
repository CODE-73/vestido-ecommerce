import useSWRMutation from 'swr/mutation';

import { useAuth } from '@vestido-ecommerce/auth/client';
import { useClearCacheOnSuccess } from '@vestido-ecommerce/utils';

import { WishlistSWRKeys } from '../keys';
import { addToWishList } from './service';
import { AddToWishListRequest, AddToWishListResponse } from './types';

export const useAddToWishlist = () => {
  const { authHeaders } = useAuth();
  const key = [WishlistSWRKeys.WISHLIST];

  return useSWRMutation<
    AddToWishListResponse,
    Error,
    string[] | null,
    AddToWishListRequest
  >(key, (_, { arg }) => addToWishList({ ...arg }, authHeaders), {
    ...useClearCacheOnSuccess(WishlistSWRKeys.WISHLIST),
  });
};
