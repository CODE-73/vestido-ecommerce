import { Category } from '@prisma/client';

import { CreateCategorySchemaType } from './zod';

export type CreateCategoryArgs = CreateCategorySchemaType;

export type CreateCategoryResult = Category;
