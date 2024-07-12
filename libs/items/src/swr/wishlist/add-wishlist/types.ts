import { WishlistItem } from '@prisma/client';

export type AddToWishlistRequest = Omit<WishlistItem, 'id' | 'customerId'>;

export type AddToWishlistResponse = {
  data: WishlistItem;
};
