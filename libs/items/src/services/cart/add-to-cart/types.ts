import { CartItem } from '@prisma/client';

import { AddToCartSchemaType } from './zod';

export type AddToCartArgs = AddToCartSchemaType;

export type AddToCartResult = CartItem;
