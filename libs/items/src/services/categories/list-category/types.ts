import { Category } from '@prisma/client';

export type ListCategoriesResponse = {
  data: Category[];
};
