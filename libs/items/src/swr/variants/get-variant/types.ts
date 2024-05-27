import { ItemVariant, VariantAttributeValue } from '@prisma/client';

export type variantDetailsResponse = {
  data: ItemVariant & {
    attributeValues: VariantAttributeValue[];
  };
};
