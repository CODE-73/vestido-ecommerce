import { Item } from '@prisma/client';

import { ReleaseStockSchemaType } from './zod';

export type ReleaseStockArgs = ReleaseStockSchemaType;
export type ReleaseStockResult = Item;
