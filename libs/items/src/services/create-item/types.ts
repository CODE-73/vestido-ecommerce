import { Item } from '@prisma/client';
import { CreateItemSchemaType } from './zod';

export type CreateItemRequest = {
  data: CreateItemSchemaType;
};
export type CreateItemResponse = {
  data: Item;
};
