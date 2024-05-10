import { z } from 'zod';

export const CreateCategorySchema = z.object({
  name: z.string(),
  description: z.string(),
  parentCategoryId: z.string().optional(),
});

export type CreateCategorySchemaType = z.infer<typeof CreateCategorySchema>;
