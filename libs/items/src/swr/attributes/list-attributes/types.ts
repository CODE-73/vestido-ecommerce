import { ItemAttribute, ItemAttributeValue } from '@prisma/client';

export type AttributeListRequest = {
  filters?: AttributeListFilterParams;
};

export type AttributeListResponse = {
  data: Array<
    ItemAttribute & {
      ItemAttributeValues: ItemAttributeValue[];
    }
  >;
};

type AttributeListFilterParams = {
  // name?: string;
  q?: string;
};
