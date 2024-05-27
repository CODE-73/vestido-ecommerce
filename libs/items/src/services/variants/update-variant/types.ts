import { UpdateVariantSchemaType } from './zod';
import { ItemVariant, VariantAttributeValue } from '@prisma/client';

export type UpdateVariantRequest = UpdateVariantSchemaType;

export type UpdateVariantResponse = {
  data: ItemVariant & {
    attributeValues: VariantAttributeValue[];
  };
};
