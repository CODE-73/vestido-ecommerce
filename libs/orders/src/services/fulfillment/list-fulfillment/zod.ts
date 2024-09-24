import { z } from 'zod';

export const ListFulfillmentRequestSchema = z
  .object({
    q: z.string().nullish(),
  })
  .nullish();

export type ListFulfillmentRequestSchemaType = z.infer<
  typeof ListFulfillmentRequestSchema
>;
