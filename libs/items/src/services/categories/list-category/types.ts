import { type listCategories } from './service';
import { ListCategoryRequestSchemaType } from './zod';

export type ListCategoryRequest = ListCategoryRequestSchemaType;
export type ListCategoriesResponse = Awaited<ReturnType<typeof listCategories>>;
