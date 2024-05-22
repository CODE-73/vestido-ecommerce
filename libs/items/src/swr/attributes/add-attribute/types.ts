import { Category } from '@prisma/client';

export type attributeUpsertRequest = Partial<Category>;

export type attributeUpsertResponse = {
  data: Category;
};
