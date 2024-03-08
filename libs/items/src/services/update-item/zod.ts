import { z } from 'zod';

export const UpdateItemSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  price: z.string().optional(),
  unit: z.string().optional(),
  stock: z.string().optional(),
  brand: z.string().optional(),
});

export type UpdateItemSchemaType = z.infer<typeof UpdateItemSchema>;
