import useSWRMutation from 'swr/mutation';
import { AddToWishlistRequest, AddToWishlistResponse } from './types';
import { useAuth } from '@vestido-ecommerce/auth';
import { addToWishlist } from './service';
import { WishlistSWRKeys } from '../keys';
import { useClearCacheOnSuccess } from '@vestido-ecommerce/utils';

export const useAddToWishlist = () => {
  const { authHeaders } = useAuth();
  const key = [WishlistSWRKeys.WISHLIST];

  return useSWRMutation<
    AddToWishlistResponse,
    Error,
    string[] | null,
    AddToWishlistRequest
  >(key, (_, { arg }) => addToWishlist({ ...arg }, authHeaders), {
    ...useClearCacheOnSuccess(WishlistSWRKeys.WISHLIST),
  });
};
