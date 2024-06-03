import { Item } from '@prisma/client';

export type ItemUpsertRequest = Partial<Item>;

export type ItemUpsertResponse = {
  data: Item;
};
