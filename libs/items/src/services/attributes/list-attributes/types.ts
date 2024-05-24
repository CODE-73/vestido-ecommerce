import { ItemAttribute, ItemAttributeValue } from '@prisma/client';

export type ListAttributesResponse = {
  data: Array<
    ItemAttribute & {
      ItemAttributeValues: ItemAttributeValue[];
    }
  >;
};
