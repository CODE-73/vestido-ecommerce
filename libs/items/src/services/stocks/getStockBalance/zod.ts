import { z } from 'zod';

export const getStockBalanceSchema = z.object({
  itemId: z.string(),
  itemVariantId: z.string().optional(),
});

export type getStockBalanceSchemaType = z.infer<typeof getStockBalanceSchema>;
