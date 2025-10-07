import { ItemAttribute, ItemAttributeValue } from '@prisma/client';

import { UpdateAttributeSchemaType } from './zod';

export type UpdateAttributeArgs = UpdateAttributeSchemaType;

export type UpdateAttributeResult = ItemAttribute & {
  values: ItemAttributeValue[];
};
