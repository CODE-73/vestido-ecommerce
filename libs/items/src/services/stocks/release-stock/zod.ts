import { z } from 'zod';

export const ReleaseStockSchema = z.object({
  refId: z.string().optional(),
  items: z.array(
    z.object({
      itemId: z.string(),
      itemVariantId: z.string().nullish(),
      qty: z.coerce.number(),
    }),
  ),
  remarks: z.string(),
});

export type ReleaseStockSchemaType = z.infer<typeof ReleaseStockSchema>;
