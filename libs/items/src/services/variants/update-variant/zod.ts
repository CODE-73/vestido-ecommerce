import { z } from 'zod';

export const variantAttributeValueSchema = z.object({
  id: z.string().optional(),
  attributeId: z.string(),
  attributeValueId: z.string(),
});
export const UpdateVariantSchema = z.object({
  id: z.string(),
  itemId: z.string(),
  attributeValues: z.array(variantAttributeValueSchema),
  price: z.coerce.number(),
});

export type UpdateVariantSchemaType = z.infer<typeof UpdateVariantSchema>;
