import { getPrismaClient } from '@vestido-ecommerce/models';
import { CreateItemSchema, CreateItemSchemaType } from './zod';

export async function createItem(data: CreateItemSchemaType) {
  const prisma = getPrismaClient();

  // validate zod here
  const validatedData = CreateItemSchema.parse(data);
  // pass to prisma next

  const newItem = await prisma.item.create({
    data: validatedData,
  });
  // no try..catch here

  return newItem;
}
