import { getPrismaClient } from '@vestido-ecommerce/models';
import { CreateItemSchema, CreateItemSchemaType } from './zod';
import { Gender } from '@prisma/client';

export async function createItem(data: CreateItemSchemaType) {
  const prisma = getPrismaClient();

  // validate zod here
  const validatedData = CreateItemSchema.parse(data);

  if (validatedData.categoryId) {
    const category = await prisma.category.findUnique({
      where: { id: validatedData.categoryId },
    });

    const categoryGenders = category?.gender as Gender[];
    const itemGenders = validatedData.gender;

    const isSubset = itemGenders.every((gender) =>
      categoryGenders.includes(gender)
    );

    if (!isSubset) {
      throw new Error(
        "The genders of a product must be a subset of its category's genders."
      );
    }
  }

  // pass to prisma next

  const newItem = await prisma.item.create({
    data: validatedData,
  });
  // no try..catch here

  return newItem;
}
