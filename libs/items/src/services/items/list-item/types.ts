import { type listItem } from './service';

export type ListItemResponse = Awaited<ReturnType<typeof listItem>>;
