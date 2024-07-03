import { getPrismaClient } from '@vestido-ecommerce/models';
import { UpdateItemSchema, UpdateItemSchemaType } from './zod';

export async function updateItem(itemId: string, data: UpdateItemSchemaType) {
  const prisma = getPrismaClient();

  // validate zod here
  const validatedData = UpdateItemSchema.parse(data);
  // pass to prisma next

  const updatedItem = await prisma.item.update({
    where: {
      id: itemId,
    },
    data: {
      ...validatedData,
    },
  });
  // no try..catch here

  return updatedItem;
}
