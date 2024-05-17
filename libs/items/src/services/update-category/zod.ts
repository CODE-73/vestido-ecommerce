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
  gender: z
    .array(z.string())
    .refine((value) => value.some((gender) => gender), {
      message: 'You have to select at least one item.',
    })
    .optional(),
});

export type UpdateCategorySchemaType = z.infer<typeof UpdateCategorySchema>;
