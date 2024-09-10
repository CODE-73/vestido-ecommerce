import { z } from 'zod';

export const ListCategoryRequestSchema = z.object({
  q: z.string().nullish(),
  enabled: z.boolean().optional(),
});

export type ListCategoryRequestSchemaType = z.infer<
  typeof ListCategoryRequestSchema
>;
