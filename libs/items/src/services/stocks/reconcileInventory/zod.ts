import { z } from 'zod';

export const stockUpdateSchema = z.object({
  refId: z.string().optional(),
  itemId: z.string(),
  itemVariantId: z.string().optional(),
  qty: z.coerce.number(),
  remarks: z.string().nullish(),
});

export type stockUpdateSchemaType = z.infer<typeof stockUpdateSchema>;
