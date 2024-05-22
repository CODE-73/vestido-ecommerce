import { ItemAttribute } from '@prisma/client';

export type AttributeListRequest = {
  filters?: AttributeListFilterParams;
};

export type AttributeListResponse = {
  data: ItemAttribute[];
};

type AttributeListFilterParams = {
  // name?: string;
  q?: string;
};
