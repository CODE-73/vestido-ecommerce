import { z } from 'zod';

export const UpdateItemSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  price: z.string().optional(),
  unit: z.string().optional(),
  stock: z.string().optional(),
  brand: z.string().optional(),
  gender: z
    .array(z.string())
    .refine((value) => value.some((gender) => gender), {
      message: 'You have to select at least one item.',
    })
    .optional(),
});

export type UpdateItemSchemaType = z.infer<typeof UpdateItemSchema>;
