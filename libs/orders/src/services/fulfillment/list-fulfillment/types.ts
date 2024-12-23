import { getFulfillmentList } from './service';
import { ListFulfillmentSchemaType } from './zod';

export type ListFulfillmentRequest = ListFulfillmentSchemaType;

export type FulfillmentListResponse = {
  data: Awaited<ReturnType<typeof getFulfillmentList>>;
};
