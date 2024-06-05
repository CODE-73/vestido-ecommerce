import { ListAttributeRequestSchemaType } from './zod';
import { type listAttribute } from './service';

export type ListAttributesRequest = ListAttributeRequestSchemaType;
export type ListAttributesResponse = Awaited<ReturnType<typeof listAttribute>>;
