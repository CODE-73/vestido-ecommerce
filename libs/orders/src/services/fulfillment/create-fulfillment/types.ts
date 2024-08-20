import { Fulfillment, FulfillmentItem } from '@prisma/client';

import { CreateFulfillmentSchemaType } from './zod';

export type CreateFulfillmentRequest = CreateFulfillmentSchemaType;
export type CreateFulfillmentResponse = {
  data: Fulfillment & {
    fulfillmentItems: FulfillmentItem[];
  };
};
