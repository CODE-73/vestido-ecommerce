import { ItemVariant, VariantAttributeValue } from '@prisma/client';

export type VariantListRequest = {
  filters?: VariantListFilterParams;
};

export type VariantListResponse = {
  data: Array<
    ItemVariant & {
      attributeValues: VariantAttributeValue[];
    }
  >;
};

type VariantListFilterParams = {
  // name?: string;
  q?: string;
};
