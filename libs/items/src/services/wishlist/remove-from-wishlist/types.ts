import { removeFromWishlist } from './service';
import { RemoveFromWishlistSchemaType } from './zod';

export type RemoveFromWishlistArgs = RemoveFromWishlistSchemaType;

export type RemoveFromWishlistResult = Awaited<
  ReturnType<typeof removeFromWishlist>
>;
