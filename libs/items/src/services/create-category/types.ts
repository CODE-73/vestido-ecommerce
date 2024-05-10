import { Category } from '@prisma/client';
import { CreateCategorySchemaType } from './zod';

export type CreateCategoryRequest = {
  data: CreateCategorySchemaType;
};

export type CreateCategoryResponse = {
  data: Category;
};
