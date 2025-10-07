import { ItemUpsertSchemaType } from '../zod';
import { updateItem } from './service';

export type UpdateItemArgs = ItemUpsertSchemaType;

export type UpdateItemResult = Awaited<ReturnType<typeof updateItem>>;
