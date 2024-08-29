import { Item } from '@prisma/client';

import { ItemUpsertSchemaType } from '../../../services';

export type ItemUpsertRequest = ItemUpsertSchemaType;

export type ItemUpsertResponse = {
  data: Item;
};
