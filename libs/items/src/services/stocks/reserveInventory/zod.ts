import { z } from 'zod';

export const reserveInventorySchema = z.object({
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

export type reserveInventorySchemaType = z.infer<typeof reserveInventorySchema>;
