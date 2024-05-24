import { CreateAttributeSchemaType } from './zod';
import { ItemAttribute, ItemAttributeValue } from '@prisma/client';

export type CreateAttributeRequest = CreateAttributeSchemaType;

export type CreateAttributeResponse = {
  data: ItemAttribute & {
    ItemAttributeValues: ItemAttributeValue[];
  };
};
