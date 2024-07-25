import { Category } from '@prisma/client';

import { UpdateCategorySchemaType } from './zod';

export type UpdateCategoryRequest = {
  data: UpdateCategorySchemaType;
};

export type UpdateCategoryResponse = {
  data: Category;
};
