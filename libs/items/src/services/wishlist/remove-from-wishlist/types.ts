import { WishlistItem } from '@prisma/client';

import { RemoveFromWishlistSchemaType } from './zod';

export type RemoveFromWishlistRequest = {
  data: RemoveFromWishlistSchemaType;
};

export type RemoveFromWishlistResponse = {
  data: WishlistItem;
};
