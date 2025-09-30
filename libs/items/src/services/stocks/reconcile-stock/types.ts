import { Item } from '@prisma/client';

import { VestidoResponse } from '@vestido-ecommerce/utils';

import { ReconcileStockSchemaType } from './zod';

export type ReconcileStockArgs = ReconcileStockSchemaType;

export type ReconcileStockResult = Item;
export type ReconcileStockResponse = VestidoResponse<ReconcileStockResult>;
