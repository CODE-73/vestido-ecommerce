import { ItemAttribute, ItemAttributeValue } from '@prisma/client';

export type attributeUpsertRequest = Partial<ItemAttribute>;

export type attributeUpsertResponse = {
  data: ItemAttribute & {
    ItemAttributeValues: ItemAttributeValue[];
  };
};
