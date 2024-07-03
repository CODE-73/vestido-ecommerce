import { AddToCartSchemaType } from './zod';
import { CartItem } from '@prisma/client';

export type AddToCartRequest = AddToCartSchemaType;

export type AddToCartResponse = {
  data: CartItem;
};
