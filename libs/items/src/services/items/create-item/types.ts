import { ItemUpsertSchemaType } from '../zod';
import { createItem } from './service';

export type CreateItemArgs = ItemUpsertSchemaType;

export type CreateItemResult = Awaited<ReturnType<typeof createItem>>;
