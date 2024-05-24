import { UpdateAttributeSchemaType } from './zod';
import { ItemAttribute } from '@prisma/client';

export type UpdateAttributeRequest = UpdateAttributeSchemaType;

export type UpdateAttributeResponse = {
  data: ItemAttribute;
};
