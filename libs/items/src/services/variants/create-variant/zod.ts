import { z } from 'zod';
import { ImageSchema } from '@vestido-ecommerce/utils';
const uuid = z.string().uuid();

export const VariantAttributeValueSchema = z.object({
  attributeId: uuid,
  attributeValueId: uuid,
});

export const CreateVariantSchema = z.object({
  itemId: uuid,
  title: z.string().nullish(),
  images: z.array(ImageSchema),
  attributeValues: z.array(VariantAttributeValueSchema),
  price: z.coerce.number(),
});

export type CreateVariantSchemaType = z.infer<typeof CreateVariantSchema>;
