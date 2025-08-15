import { z } from 'zod';

export const releaseInventorySchema = z.object({
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

export type releaseInventorySchemaType = z.infer<typeof releaseInventorySchema>;
