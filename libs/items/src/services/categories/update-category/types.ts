import { UpdateCategorySchemaType } from './zod';
import { Category } from '@prisma/client';

export type UpdateCategoryRequest = {
  data: UpdateCategorySchemaType;
};

export type UpdateCategoryResponse = {
  data: Category;
};
