import { Item } from '@prisma/client';
import { UpdateItemSchemaType } from './zod';

export type UpdateItemRequest = {
  data: UpdateItemSchemaType;
};
export type UpdateItemResponse = {
  data: Item;
};
