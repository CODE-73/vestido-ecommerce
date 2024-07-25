import { CartItem } from '@prisma/client';

import { AddToCartSchemaType } from './zod';

export type AddToCartRequest = AddToCartSchemaType;

export type AddToCartResponse = {
  data: CartItem;
};
