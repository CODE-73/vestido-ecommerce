import { z } from 'zod';
const uuid = z.string().uuid();

export const VariantAttributeValueSchema = z.object({
  attributeId: uuid,
  attributeValueId: uuid,
});

export const CreateVariantSchema = z.object({
  itemId: uuid,
  title: z.string().nullish(),
  attributeValues: z.array(VariantAttributeValueSchema),
  price: z.coerce.number(),
});

export type CreateVariantSchemaType = z.infer<typeof CreateVariantSchema>;
