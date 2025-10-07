import { Category } from '@prisma/client';

import { UpdateCategorySchemaType } from './zod';

export type UpdateCategoryArgs = UpdateCategorySchemaType;

export type UpdateCategoryResult = Category;
