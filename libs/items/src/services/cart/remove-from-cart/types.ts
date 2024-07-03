import { CartItem } from '@prisma/client';
import { RemoveFromCartSchemaType } from './zod';

export type RemoveFromCartRequest = RemoveFromCartSchemaType;

export type RemoveFromCartResponse = {
  data: CartItem;
};
