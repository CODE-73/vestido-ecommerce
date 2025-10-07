import { z } from 'zod';

export const GetStockBalanceInputSchema = z.object({
  itemId: z.string(),
  itemVariantId: z.string().optional(),
});

export type GetStockBalanceInputSchemaType = z.infer<
  typeof GetStockBalanceInputSchema
>;
