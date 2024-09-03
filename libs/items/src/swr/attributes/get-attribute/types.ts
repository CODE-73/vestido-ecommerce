import { ItemAttribute, ItemAttributeValue } from '@prisma/client';

export type attributeDetailsResponse = {
  data: ItemAttribute & {
    values: ItemAttributeValue[];
  };
};
