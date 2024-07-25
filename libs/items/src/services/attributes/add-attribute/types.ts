import { ItemAttribute, ItemAttributeValue } from '@prisma/client';

import { CreateAttributeSchemaType } from './zod';

export type CreateAttributeRequest = CreateAttributeSchemaType;

export type CreateAttributeResponse = {
  data: ItemAttribute & {
    ItemAttributeValues: ItemAttributeValue[];
  };
};
