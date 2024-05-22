import { RemoveFromWishlistSchemaType } from './zod';
import { WishlistItem } from '@prisma/client';

export type RemoveFromWishlistRequest = {
  data: RemoveFromWishlistSchemaType;
};

export type RemoveFromWishlistResponse = {
  data: WishlistItem;
};
