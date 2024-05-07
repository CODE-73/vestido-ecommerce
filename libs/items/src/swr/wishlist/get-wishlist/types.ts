import { WishlistItem } from '@prisma/client';

export type WishlistResponse = {
  data: WishlistItem[];
};
