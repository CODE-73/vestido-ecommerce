import { updateAttribute } from './services';
import { UpdateAttributeSchemaType } from './zod';

export type UpdateAttributeArgs = UpdateAttributeSchemaType;

export type UpdateAttributeResult = Awaited<ReturnType<typeof updateAttribute>>;
