import { type listAttribute } from './service';
import { ListAttributeRequestSchemaType } from './zod';

export type ListAttributeArgs = ListAttributeRequestSchemaType;
export type ListAttributesResult = Awaited<ReturnType<typeof listAttribute>>;
