import { ItemVariant, VariantAttributeValue } from '@prisma/client';

import { UpdateVariantSchemaType } from './zod';

export type UpdateVariantRequest = UpdateVariantSchemaType;

export type UpdateVariantResponse = {
  data: ItemVariant & {
    attributeValues: VariantAttributeValue[];
  };
};
