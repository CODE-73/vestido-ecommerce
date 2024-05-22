import { WishlistItem } from '@prisma/client';
import { AddToWishlistSchemaType } from './zod';

export type AddToWishlistRequest = {
  data: AddToWishlistSchemaType;
};

export type AddToWishlistResponse = {
  data: WishlistItem;
};
