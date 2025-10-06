import { type listItem } from './service';
import { ListItemRequestSchemaType } from './zod';
export type ListItemArgs = ListItemRequestSchemaType;
export type ListItemResult = Awaited<ReturnType<typeof listItem>>;
