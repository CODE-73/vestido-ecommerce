import { ItemVariant, VariantAttributeValue } from '@prisma/client';

export type ItemVariantWithAttributes = ItemVariant & {
  attributeValues: VariantAttributeValue[];
};
