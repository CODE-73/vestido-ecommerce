import { getFulfillmentList } from './service';
import { ListFulfillmentSchemaType } from './zod';

export type ListFulfillmentRequest = ListFulfillmentSchemaType;

export type ListFulfillmentResult = Awaited<
  ReturnType<typeof getFulfillmentList>
>;
