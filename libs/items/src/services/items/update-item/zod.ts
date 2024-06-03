import { z } from 'zod';

export const UpdateItemSchema = z.object({
  title: z.string(),
  description: z.string(),
  price: z.string(),
  unit: z.string(),
  stock: z.string(),
  hasVariants: z.boolean().default(false),
  gender: z
    .array(z.string())
    .refine((value) => value.some((gender) => gender), {
      message: 'You have to select at least one item.',
    })
    .optional(),
});

export type UpdateItemSchemaType = z.infer<typeof UpdateItemSchema>;
