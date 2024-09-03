import { Item } from '@prisma/client';

import { ItemUpsertSchemaType } from '../zod';

export type UpdateItemRequest = {
  data: ItemUpsertSchemaType;
};
export type UpdateItemResponse = {
  data: Item;
};
