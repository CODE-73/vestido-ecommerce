import { WishlistItem } from '@prisma/client';

export type RemoveFromWishlistRequest = {
  data: Partial<WishlistItem>;
};

export type RemoveFromWishlistResponse = {
  data: WishlistItem;
};
