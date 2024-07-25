import { type listAttribute } from './service';
import { ListAttributeRequestSchemaType } from './zod';

export type ListAttributesRequest = ListAttributeRequestSchemaType;
export type ListAttributesResponse = Awaited<ReturnType<typeof listAttribute>>;
