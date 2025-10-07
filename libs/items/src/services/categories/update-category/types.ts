import { updateCategory } from './service';
import { UpdateCategorySchemaType } from './zod';

export type UpdateCategoryArgs = UpdateCategorySchemaType;

export type UpdateCategoryResult = Awaited<ReturnType<typeof updateCategory>>;
