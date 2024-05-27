import { ItemVariant, VariantAttributeValue } from '@prisma/client';

export type VariantListRequest = {
  filters?: VariantListFilterParams;
};

export type VariantListResponse = {
  data: Array<
    ItemVariant & {
      ItemAttributeValues: VariantAttributeValue[];
    }
  >;
};

type VariantListFilterParams = {
  // name?: string;
  q?: string;
};
