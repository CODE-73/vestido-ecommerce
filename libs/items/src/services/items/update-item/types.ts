import { Item } from '@prisma/client';

import { ItemUpsertSchemaType } from '../zod';

export type UpdateItemArgs = ItemUpsertSchemaType;

export type UpdateItemResult = Item;
