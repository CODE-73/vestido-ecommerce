import { Item } from '@prisma/client';

import { ItemUpsertSchemaType } from '../zod';

export type CreateItemRequest = {
  data: ItemUpsertSchemaType;
};
export type CreateItemResponse = {
  data: Item;
};
