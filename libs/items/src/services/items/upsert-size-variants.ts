import {
  getPrismaClient,
  PrismaTransactionalClient,
} from '@vestido-ecommerce/models';
import { slugify } from '@vestido-ecommerce/utils';

import { getItemDetails, ItemDetails } from './get-item';
import { ItemVariantWithSize } from './zod';

type SizeAttribute = Awaited<ReturnType<typeof getSizeAttribute>>;

export async function upsertSizeVariants(
  prisma: PrismaTransactionalClient,
  itemId: string,
  variants: ItemVariantWithSize[],
) {
  const sizeAttribute = await getSizeAttribute();
  const item = await getItemDetails(itemId, prisma);
  if (!item) {
    throw new Error('Item does not exist');
  }

  const existingVariants = item?.variants ?? [];
  const existingVariantSizeMap = existingVariants.reduce(
    (acc, curr) => {
      acc[curr.id] = curr.attributeValues[0].attributeValueId;
      return acc;
    },
    {} as Record<string, string>,
  );

  // Filter out those that are NEW and DISABLED. We won't insert them.
  variants = variants.filter((variant) => variant.id || variant.enabled);

  for (const variant of variants) {
    if (!variant.id) {
      await createItemVariant(prisma, item, variant, sizeAttribute);
      continue;
    }

    // Existing Variant Logic.
    if (!existingVariantSizeMap[variant.id]) {
      throw new Error('Existing Variant not found');
    }

    // Has the Size changed?
    if (existingVariantSizeMap[variant.id] !== variant.itemAttributeValueId) {
      const variantAttributeValueId = existingVariants.find(
        (x) => x.id === variant.id,
      )?.attributeValues?.[0]?.id;

      if (!variantAttributeValueId) {
        throw new Error('Variant Attribute Value does not exist / LogicError');
      }

      await prisma.variantAttributeValue.update({
        where: {
          id: variantAttributeValueId,
        },
        data: {
          attributeValueId: variant.itemAttributeValueId,
        },
      });
    }

    // Update main variant fields.
    await prisma.itemVariant.update({
      where: {
        id: variant.id,
      },
      data: {
        ...getDefaultVariantFields(item, variant, sizeAttribute),
      },
    });
  }
}

/**
 * Creates a Fresh ItemVariant & a single VariantAttributeValue for the given Size
 */
async function createItemVariant(
  prisma: PrismaTransactionalClient,
  item: ItemDetails,
  variant: ItemVariantWithSize,
  sizeAttribute: SizeAttribute,
) {
  const itemVariant = await prisma.itemVariant.create({
    data: {
      ...getDefaultVariantFields(item, variant, sizeAttribute),
      itemId: item.id,
    },
  });

  await prisma.variantAttributeValue.create({
    data: {
      variantId: itemVariant.id,
      attributeId: sizeAttribute.sizeAttributeId,
      attributeValueId: variant.itemAttributeValueId,
    },
  });
}

/**
 * Given ItemDetails & ItemVariantWithSize, returns the common fields on ItemVariant table
 */
function getDefaultVariantFields(
  item: ItemDetails,
  variant: ItemVariantWithSize,
  { sizeLabels }: SizeAttribute,
) {
  return {
    price: item.price,
    stockStatus: variant.stockStatus,
    sku: variant.sku,
    enabled: variant.enabled,
    title: item.title,
    slug: slugify(`${item.slug}-${sizeLabels[variant.itemAttributeValueId]}`),
  };
}

/**
 * Find the Size Attribute, return its ID and the sizeLabels
 */
async function getSizeAttribute() {
  const prisma = getPrismaClient();
  const sizeAttributeIds = (await prisma.$queryRaw`
    SELECT id FROM "ItemAttribute" WHERE LOWER(name) = 'size'
  `) as unknown as Array<{ id: string }>;

  if (!sizeAttributeIds || sizeAttributeIds.length === 0) {
    throw new Error('Size Attribute does not exist');
  }

  const sizeAttributeId = sizeAttributeIds[0].id;

  const sizeAttribute = (await prisma.$queryRaw`
    SELECT v.id, v.value FROM
    "ItemAttributeValue" v
    JOIN "ItemAttribute" a ON v."attributeId" = a.id
    WHERE a.id = ${sizeAttributeId}::UUID
  `) as unknown as Array<{ id: string; value: string }>;

  if (!sizeAttribute || sizeAttribute.length === 0) {
    throw new Error('Size Attribute does not exist');
  }

  return {
    sizeAttributeId,
    sizeLabels: sizeAttribute.reduce(
      (acc, curr) => {
        acc[curr.id] = curr.value;
        return acc;
      },
      {} as Record<string, string>,
    ),
  };
}
