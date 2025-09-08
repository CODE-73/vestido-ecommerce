import { Item } from '@prisma/client';

import { VestidoResponse } from '@vestido-ecommerce/utils';

import { ReconcileStockSchemaType } from './zod';

export type ReconcileStockRequest = ReconcileStockSchemaType;

export type ReconcileStockResponse = {
  data: Item;
};

export type ReconcileStockSWRResponse = VestidoResponse<ReconcileStockResponse>;
