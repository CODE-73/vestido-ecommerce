import { z } from 'zod';

export const CreateCategorySchema = z.object({
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

export type CreateCategorySchemaType = z.infer<typeof CreateCategorySchema>;
