import { getFulfillmentList } from './service';
import { ListFulfillmentRequestSchemaType } from './zod';

export type ListFulfillmentRequest = ListFulfillmentRequestSchemaType;

export type FulfillmentListResponse = {
  data: Awaited<ReturnType<typeof getFulfillmentList>>;
};
