import { Item } from '@prisma/client';

import { ReserveStockSchemaType } from './zod';

export type ReserveInventoryArgs = ReserveStockSchemaType;
export type ReserveInventoryResult = Item;
