import { Category } from '@prisma/client';

export type CategoryListRequest = {
  filters?: CategoryListFilterParams;
};

export type CategoryListResponse = {
  data: Category[];
};

type CategoryListFilterParams = {
  // name?: string;
  q?: string;
};
