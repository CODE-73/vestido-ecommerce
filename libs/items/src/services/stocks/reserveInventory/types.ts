import { Item } from '@prisma/client';

import { reserveInventorySchemaType } from './zod';

export type reserveInventoryRequest = {
  data: reserveInventorySchemaType;
};
export type reserveInventoryResponse = {
  data: Item;
};
