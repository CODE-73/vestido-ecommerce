import useSWRMutation from 'swr/mutation';
import { AddToWishListRequest, AddToWishListResponse } from './types';
import { useAuth } from '@vestido-ecommerce/auth';
import { addToWishList } from './service';
import { WishlistSWRKeys } from '../keys';
import { useClearCacheOnSuccess } from '@vestido-ecommerce/utils';

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
