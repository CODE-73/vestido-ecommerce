import { z } from 'zod';

export const UpdateCategorySchema = z.object({
  name: z.string(),
  description: z.string(),
  parentCategoryId: z
    .string()
    .nullable()
    .transform((x) => {
      if (!x || x.length === 0) {
        return null;
      }
      return x;
    }),
});

export type UpdateCategorySchemaType = z.infer<typeof UpdateCategorySchema>;
