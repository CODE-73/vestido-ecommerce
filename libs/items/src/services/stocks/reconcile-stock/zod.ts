import { z } from 'zod';

export const ReconcileStockSchema = z.object({
  refId: z.string().nullish(),
  itemId: z.string(),
  itemVariantId: z.string().nullish(),
  qty: z.coerce.number().min(0, 'Quantity must be at least 0'),
  remarks: z.string().nullish(),
});

export type ReconcileStockSchemaType = z.infer<typeof ReconcileStockSchema>;
