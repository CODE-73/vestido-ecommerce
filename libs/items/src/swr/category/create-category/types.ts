import { Category } from '@prisma/client';

export type categoryUpsertRequest = Partial<Category>;

export type categoryUpsertResponse = {
  data: Category;
};
