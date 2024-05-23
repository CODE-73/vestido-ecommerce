import { ItemAttribute } from '@prisma/client';

export type attributeUpsertRequest = Partial<ItemAttribute>;

export type attributeUpsertResponse = {
  data: ItemAttribute;
};
