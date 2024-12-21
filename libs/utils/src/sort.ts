import { z } from 'zod';

export const OrderByFieldSchema = z.object({
  column: z.string().default('createdAt'),
  direction: z.enum(['asc', 'desc']).default('asc'),
});

export type OrderByFieldType = z.infer<typeof OrderByFieldSchema>;
