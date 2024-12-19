import { z } from 'zod';

export const OrderByFieldSchema = z.object({
  column: z.string().default('dateTime'),
  direction: z.enum(['asc', 'desc']).default('desc'),
});

export type OrderByFieldType = z.infer<typeof OrderByFieldSchema>;
