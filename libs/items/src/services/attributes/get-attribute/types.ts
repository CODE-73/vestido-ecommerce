import { ItemAttribute, ItemAttributeValue } from '@prisma/client';

export type AttributeDetailsResponse = {
  data: ItemAttribute & {
    values: ItemAttributeValue[];
  };
};
