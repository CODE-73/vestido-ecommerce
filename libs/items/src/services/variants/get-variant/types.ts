import { ItemVariant, VariantAttributeValue } from '@prisma/client';

export type VariantDetailsResponse = {
  data: ItemVariant & {
    attributeValues: VariantAttributeValue[];
  };
};
