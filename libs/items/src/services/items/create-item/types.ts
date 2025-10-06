import { Item } from '@prisma/client';

import { ItemUpsertSchemaType } from '../zod';

export type CreateItemArgs = ItemUpsertSchemaType;

export type CreateItemResult = Item;
