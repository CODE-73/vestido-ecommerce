import { Item } from '@prisma/client';

import { releaseInventorySchemaType } from './zod';

export type releaseInventoryRequest = {
  data: releaseInventorySchemaType;
};
export type releaseInventoryResponse = {
  data: Item;
};
