import { type listItem } from './service';
import { ListItemRequestSchemaType } from './zod';
export type ListItemRequest = ListItemRequestSchemaType;
export type ListItemResponse = Awaited<ReturnType<typeof listItem>>;
