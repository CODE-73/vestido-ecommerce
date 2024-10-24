import * as z from 'zod';

import {
  ItemDetailsResponse,
  ItemUpsertSchema,
  ItemVariantWithAttributes,
  ItemVariantWithSize,
} from '@vestido-ecommerce/items/client';
import { ImageSchemaType } from '@vestido-ecommerce/utils';

export { type ItemVariantWithSize };

export const CreateProductFormSchema = ItemUpsertSchema;

export type CreateProductForm = z.infer<typeof CreateProductFormSchema>;

export const CreateProductFormDefaultValues = {
  title: '',
  price: 0,
  description: '',
  categoryId: '',
  gender: ['MEN', 'WOMEN'],
  hasVariants: true,
  stockStatus: 'AVAILABLE',
  images: [],
  discountPercent: 0,
  discountedPrice: 0,
  slug: '',
  enabled: true,
  sku: '',
  variants: [],
  taxTitle: '',
  taxRate: 0,
  taxInclusive: true,
  sizeChart: '',
} satisfies CreateProductForm;

export function parseItemDetails(item: ItemDetailsResponse['data']) {
  if (!item) {
    return {
      ...CreateProductFormDefaultValues,
    };
  }

  return structuredClone({
    ...CreateProductFormDefaultValues,
    ...item,
    categoryId: item.categoryId ?? '',
    images: (item.images as ImageSchemaType[]) ?? [],
    variants: parseVariants(item.variants ?? []),
  } satisfies CreateProductForm);
}

function parseVariants(variants: ItemVariantWithAttributes[]) {
  return variants.map((variant) => {
    if (variant.attributeValues.length > 1) {
      throw new Error('Only one attribute is supported (Size)');
    }

    if (variant.attributeValues.length === 0) {
      throw new Error('Variant must have at least one attribute (Size)');
    }

    const sizeAttribute = variant.attributeValues[0];

    return {
      ...variant,
      itemAttributeValueId: sizeAttribute.attributeValueId,
    } satisfies ItemVariantWithSize;
  });
}
