import { WishlistItem } from '@prisma/client';
import { AddToWishlistSchemaType } from './zod';

export type AddToWishlistRequest = AddToWishlistSchemaType;

export type AddToWishlistResponse = {
  data: WishlistItem;
};
