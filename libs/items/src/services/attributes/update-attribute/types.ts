import { ItemAttribute, ItemAttributeValue } from '@prisma/client';

import { UpdateAttributeSchemaType } from './zod';

export type UpdateAttributeRequest = UpdateAttributeSchemaType;

export type UpdateAttributeResponse = {
  data: ItemAttribute & {
    values: ItemAttributeValue[];
  };
};
