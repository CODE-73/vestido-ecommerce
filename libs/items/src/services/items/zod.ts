import { Gender, StockStatus } from '@prisma/client';
import { z } from 'zod';

import { ImageSchema } from '@vestido-ecommerce/utils';

export const ItemVariantWithSizeSchema = z.object({
  id: z.string().optional(),
  itemAttributeValueId: z.string(),
  enabled: z.boolean().default(false),
  sku: z.string().nullish(),
  stockStatus: z
    .nativeEnum(StockStatus)
    .default('AVAILABLE' satisfies StockStatus),
});

export type ItemVariantWithSize = z.infer<typeof ItemVariantWithSizeSchema>;

export const ItemUpsertSchema = z
  .object({
    id: z.string().optional(),
    title: z
      .string()
      .min(2, { message: 'Please provide a title for the product' }),
    description: z
      .string()
      .min(2, { message: 'Please provide description for the product' }),
    price: z.coerce
      .number()
      .min(0, { message: 'Price must be a positive number' }),
    stockStatus: z
      .nativeEnum(StockStatus)
      .default('AVAILABLE' satisfies StockStatus),
    gender: z
      .array(z.nativeEnum(Gender))
      .refine((value) => value.some((gender) => gender), {
        message: 'You have to select at least one gender',
      })
      .default(['MEN', 'WOMEN'] satisfies Gender[]),
    categoryId: z.string().min(2, { message: 'You have to choose a category' }),
    images: z.array(ImageSchema).optional(),
    hasVariants: z.boolean().default(true),
    discountPercent: z.coerce
      .number()
      .max(100, { message: 'Percentage cannot be more than 100' })
      .default(0)
      .nullable()
      .or(z.literal(null)),
    discountedPrice: z.coerce
      .number()
      .min(0, { message: 'Discounted price must be a positive number' })
      .nullable()
      .or(z.literal(null)),
    slug: z
      .string()
      .min(2, { message: 'slug is required' })
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { message: 'Invalid slug format' }),
    enabled: z.boolean().default(true),
    sku: z.string().nullish(),
    // Temporary Size only Variants
    variants: z.array(ItemVariantWithSizeSchema).optional(),
    taxTitle: z.string().nullable().default(null),
    taxRate: z.coerce.number().nullable().default(null),
    taxInclusive: z.boolean().nullish().default(true),
    sizeChart: z.string().nullable().default(''),
  })
  .refine(
    (data) => {
      if (data.taxInclusive) {
        return data.taxTitle && data.taxRate;
      }
      return true;
    },
    {
      message: 'Tax title and tax rate are required when tax is inclusive',
      path: ['taxInclusive'],
    },
  );

export type ItemUpsertSchemaType = z.infer<typeof ItemUpsertSchema>;
