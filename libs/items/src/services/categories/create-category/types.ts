import { createCategory } from './service';
import { CreateCategorySchemaType } from './zod';

export type CreateCategoryArgs = CreateCategorySchemaType;

export type CreateCategoryResult = Awaited<ReturnType<typeof createCategory>>;
