import { CartItem } from '@prisma/client';
import { RemoveFromCartSchemaType } from './zod';

export type RemoveFromCartRequest = {
  data: RemoveFromCartSchemaType;
};

export type RemoveFromCartResponse = {
  data: CartItem;
};
