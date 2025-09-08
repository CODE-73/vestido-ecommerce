import { Item } from '@prisma/client';

import { ReleaseStockSchemaType } from './zod';

export type releaseStockRequest = {
  data: ReleaseStockSchemaType;
};
export type releaseStockResponse = {
  data: Item;
};
