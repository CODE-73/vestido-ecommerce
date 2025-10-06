import { Item } from '@prisma/client';

import { ReconcileStockSchemaType } from './zod';

export type ReconcileStockArgs = ReconcileStockSchemaType;
export type ReconcileStockResult = Item;
