import { Gender } from '@prisma/client';

import { addThumbhashToImages } from '@vestido-ecommerce/caching';
import { getPrismaClient } from '@vestido-ecommerce/models';
import { VestidoError } from '@vestido-ecommerce/utils';

import { validateSlug } from '../../slug';
import { getItemDetails } from '../get-item';
import { upsertSizeVariants } from '../upsert-size-variants';
import { ItemUpsertSchema, ItemUpsertSchemaType } from '../zod';

export async function createItem(data: ItemUpsertSchemaType) {
  const prisma = getPrismaClient();

  // validate zod here
  const validatedData = ItemUpsertSchema.parse(data);
  validatedData.slug = await validateSlug({
    generateFrom: validatedData.title,
    slug: validatedData.slug,
    tableName: 'item',
  });

  if (validatedData.categoryId) {
    const category = await prisma.category.findUnique({
      where: { id: validatedData.categoryId },
    });

    const categoryGenders = category?.gender as Gender[];
    const itemGenders = validatedData.gender;

    const isSubset = itemGenders.every((gender) =>
      categoryGenders.includes(gender),
    );

    if (!isSubset) {
      // throw new VestidoError(
      //   "The genders of a product must be a subset of its category's genders.",
      // );
      throw new VestidoError({
        name: 'ProductGenderNotSubsetOfCategoryGender',
        message:
          'The product should only have genders included in its category',
        httpStatus: 404,
        context: {
          site: 'dashboard',
          category: category,
          categoryGenders: category?.gender as Gender[],
          item: validatedData,
          itemGenders: itemGenders,
        },
      });
    }
  }

  await addThumbhashToImages(validatedData.images ?? []);

  const { variants, ...itemData } = validatedData;
  let newItemId = '';

  await prisma.$transaction(async (prisma) => {
    const newItem = await prisma.item.create({
      data: {
        ...itemData,
        slug: validatedData.slug ?? '',
      },
    });
    newItemId = newItem.id;

    await upsertSizeVariants(prisma, newItemId, variants ?? []);
  });

  return await getItemDetails(newItemId!);
}
