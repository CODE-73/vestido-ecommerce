import { Category } from '@prisma/client';

export type categoryUpsertRequest = {
  data: Partial<Category>;
};

export type categoryUpsertResponse = {
  data: Category;
};
