import { Category } from '@prisma/client';

export type listCategoriesResponse = {
  data: Category[];
};
