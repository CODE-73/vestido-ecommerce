import { ItemVariantWithAttributes } from '../types';
import { CreateVariantSchemaType } from './zod';

export type CreateVariantRequest = {
  data: CreateVariantSchemaType;
};
export type CreateVariantResponse = {
  data: ItemVariantWithAttributes;
};
