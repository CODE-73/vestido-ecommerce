import { ItemVariant, VariantAttributeValue } from '@prisma/client';
import { CreateVariantSchemaType } from './zod';

export type CreateVariantRequest = {
  data: CreateVariantSchemaType;
};
export type CreateVariantResponse = {
  data: ItemVariant & {
    attributeValues: VariantAttributeValue[];
  };
};
