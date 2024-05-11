import { z } from 'zod';

export const UpdateCategorySchema = z.object({
  name: z.string(),
  description: z.string(),
  parentCategoryId: z.string().optional(),
});

export type UpdateCategorySchemaType = z.infer<typeof UpdateCategorySchema>;
