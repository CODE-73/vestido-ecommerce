import { WishlistItem } from '@prisma/client';

export type RemoveFromWishListRequest = {
  data: Partial<WishlistItem>;
};

export type RemoveFromWishListResponse = {
  data: WishlistItem;
};
