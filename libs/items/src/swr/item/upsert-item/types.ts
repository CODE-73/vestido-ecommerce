import { Item } from '@prisma/client';

export type ItemUpsertRequest =
  // data: Partial<Item>;
  Partial<Item>;

export type ItemUpsertResponse = {
  data: Item;
};
