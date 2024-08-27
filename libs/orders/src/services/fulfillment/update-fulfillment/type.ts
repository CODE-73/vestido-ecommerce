import { Fulfillment, FulfillmentItem } from '@prisma/client';

import { UpdateFulfillmentSchemaType } from './zod';

// Define the type that includes `fulfillmentId`
export type UpdateFulfillmentRequest = UpdateFulfillmentSchemaType & {
  fulfillmentId: string; // Add `fulfillmentId` as a required field
};

export type FulfillmentResponse = {
  data: Fulfillment & {
    fulfillmentItems: FulfillmentItem[];
  };
};
