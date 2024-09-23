import { Fulfillment, FulfillmentItem } from '@prisma/client';

import { UpdateFulfillmentSchemaType } from './zod';

// Define the type that includes `fulfillmentId`
export type UpdateFulfillmentRequest = UpdateFulfillmentSchemaType;

export type FulfillmentResponse = {
  data: Fulfillment & {
    fulfillmentItems: FulfillmentItem[];
  };
};
