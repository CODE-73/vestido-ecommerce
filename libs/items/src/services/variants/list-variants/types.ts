import { ItemVariant, VariantAttributeValue } from '@prisma/client';

export type ListVariantsResponse = {
  data: Array<
    ItemVariant & {
      attributeValues: VariantAttributeValue[];
    }
  >;
};
