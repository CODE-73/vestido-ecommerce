import { z } from 'zod';

export const ListCategoryRequestSchema = z.object({
  q: z.string().nullish(),
});

export type ListCategoryRequestSchemaType = z.infer<
  typeof ListCategoryRequestSchema
>;
