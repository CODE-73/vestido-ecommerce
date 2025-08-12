import { Item } from '@prisma/client';

import { stockUpdateSchemaType } from './zod';

export type stockUpdateRequest = {
  data: stockUpdateSchemaType;
};
export type stockUpdateResponse = {
  data: Item;
};
