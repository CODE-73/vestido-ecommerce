import { CreateAttributeSchemaType } from './zod';
import { ItemAttribute } from '@prisma/client';

export type CreateAttributeRequest = CreateAttributeSchemaType;

export type CreateAttributeResponse = {
  data: ItemAttribute;
};
