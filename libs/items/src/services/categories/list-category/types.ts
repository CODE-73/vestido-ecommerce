import { type listCategories } from './service';
import { ListCategoryRequestSchemaType } from './zod';

export type ListCategoryArgs = ListCategoryRequestSchemaType;
export type ListCategoryResult = Awaited<ReturnType<typeof listCategories>>;
