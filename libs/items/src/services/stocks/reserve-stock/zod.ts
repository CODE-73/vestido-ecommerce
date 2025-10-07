import { z } from 'zod';

export const ReserveStockSchema = z.object({
  refId: z.string().optional(),
  items: z.array(
    z.object({
      itemId: z.string(),
      itemVariantId: z.string().nullish(),
      qty: z.coerce.number().min(1, { message: 'Quantity must be at least 1' }),
    }),
  ),
  remarks: z.string(),
});

export type ReserveStockSchemaType = z.infer<typeof ReserveStockSchema>;
