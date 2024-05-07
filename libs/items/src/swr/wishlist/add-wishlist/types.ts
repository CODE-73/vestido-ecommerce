import { WishlistItem } from '@prisma/client';

export type AddToWishlistRequest = {
  data: Partial<WishlistItem>;
};

export type AddToWishlistResponse = {
  data: WishlistItem;
};
