import { z } from 'zod';

export const CreateItemSchema = z.object({
  title: z.string(),
  description: z.string(),
  price: z.string(),
  unit: z.string(),
  stock: z.string(),
  brand: z.string(),
});

export type CreateItemSchemaType = z.infer<typeof CreateItemSchema>;
