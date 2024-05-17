import { z } from 'zod';

export const CreateItemSchema = z.object({
  title: z.string(),
  description: z.string(),
  price: z.string(),
  unit: z.string(),
  stock: z.string(),
  brand: z.string(),
  gender: z
    .array(z.string())
    .refine((value) => value.some((gender) => gender), {
      message: 'You have to select at least one item.',
    })
    .default(['Men', 'Women']),
});

export type CreateItemSchemaType = z.infer<typeof CreateItemSchema>;
