import { Gender } from '@prisma/client';
import { z } from 'zod';

export const UpdateCategorySchema = z.object({
  name: z.string(),
  description: z
    .string()
    .nullable()
    .transform((x) => {
      if (!x || x.length === 0) {
        return null;
      }
      return x;
    }),
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
    .array(z.nativeEnum(Gender))
    .refine((value) => value.some((gender) => gender), {
      message: 'You have to select at least one item.',
    })
    .default(['MEN', 'WOMEN'] satisfies Gender[]),
  slug: z.string().optional(),
  enabled: z.boolean().default(true),
  searchTerms: z.array(z.string()).default([]),
});

export type UpdateCategorySchemaType = z.infer<typeof UpdateCategorySchema>;
