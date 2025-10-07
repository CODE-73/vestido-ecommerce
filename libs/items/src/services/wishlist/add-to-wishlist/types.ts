import { addToWishlist } from './service';
import { AddToWishlistSchemaType } from './zod';

export type AddToWishlistArgs = AddToWishlistSchemaType;

export type AddToWishlistResult = Awaited<ReturnType<typeof addToWishlist>>;
