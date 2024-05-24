import { UpdateAttributeSchemaType } from './zod';
import { ItemAttribute, ItemAttributeValue } from '@prisma/client';

export type UpdateAttributeRequest = UpdateAttributeSchemaType;

export type UpdateAttributeResponse = {
  data: ItemAttribute & {
    ItemAttributeValues: ItemAttributeValue[];
  };
};
