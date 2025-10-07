import { createAttribute } from './services';
import { CreateAttributeSchemaType } from './zod';

export type CreateAttributeArgs = CreateAttributeSchemaType;

export type CreateAttributeResult = Awaited<ReturnType<typeof createAttribute>>;

// export type CreateAttributeResult = ItemAttribute & {
//   values: ItemAttributeValue[];
// };
