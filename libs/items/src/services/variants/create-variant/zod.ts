import { z } from 'zod';
const uuid = z.string().uuid();

export const VariantAttributeValueSchema = z.object({
  attributeId: uuid,
  attributeValueId: uuid,
});

export const CreateVariantSchema = z.object({
  itemId: uuid,
  attributeValues: z.array(VariantAttributeValueSchema),
});

export type CreateVariantSchemaType = z.infer<typeof CreateVariantSchema>;