import { z } from 'zod';

export const ListAttributeRequestSchema = z.object({
  q: z.string().nullish(),
});

export type ListAttributeRequestSchemaType = z.infer<
  typeof ListAttributeRequestSchema
>;
