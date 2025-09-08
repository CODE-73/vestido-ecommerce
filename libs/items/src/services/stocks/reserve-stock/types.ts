import { Item } from '@prisma/client';

import { ReserveStockSchemaType } from './zod';

export type ReserveInventoryRequest = {
  data: ReserveStockSchemaType;
};
export type ReserveInventoryResponse = {
  data: Item;
};
