import { ItemVariant, VariantAttributeValue } from '@prisma/client';

export type variantUpsertRequest = Partial<ItemVariant>;

export type variantUpsertResponse = {
  data: ItemVariant & {
    attributeValues: VariantAttributeValue[];
  };
};
