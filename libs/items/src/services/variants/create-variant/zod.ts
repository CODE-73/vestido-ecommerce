import { StockStatus } from '@prisma/client';
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
  slug: z.string().optional(),
  enabled: z.boolean().default(true),
  sku: z.string().nullish(),
});

export type CreateVariantSchemaType = z.infer<typeof CreateVariantSchema>;
