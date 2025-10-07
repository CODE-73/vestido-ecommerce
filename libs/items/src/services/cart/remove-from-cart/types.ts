import { CartItem } from '@prisma/client';

import { RemoveFromCartSchemaType } from './zod';

export type RemoveFromCartArgs = RemoveFromCartSchemaType;

export type RemoveFromCartResult = CartItem;
