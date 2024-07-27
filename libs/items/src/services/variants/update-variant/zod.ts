import { StockStatus } from '@prisma/client';
import { z } from 'zod';

import { ImageSchema } from '@vestido-ecommerce/utils';

export const variantAttributeValueSchema = z.object({
  id: z.string().optional(),
  attributeId: z.string(),
  attributeValueId: z.string(),
});
export const UpdateVariantSchema = z.object({
  id: z.string(),
  itemId: z.string(),
  images: z.array(ImageSchema),
  attributeValues: z.array(variantAttributeValueSchema),
  price: z.coerce.number(),
  default: z.boolean(),
  stockStatus: z
    .nativeEnum(StockStatus)
    .default('AVAILABLE' satisfies StockStatus),
  discountPercent: z.coerce
    .number()
    .max(100, { message: 'Percentage cannot be more than 100' })
    .default(0)
    .nullable(),
  discountedPrice: z.coerce.number().nullable(),
  slug: z.string(),
  enabled: z.boolean().default(true),
});

export type UpdateVariantSchemaType = z.infer<typeof UpdateVariantSchema>;
