import { PrismaClient } from '@prisma/client';
import { CreateItemSchema, CreateItemSchemaType } from './zod';

export async function createItem(data: CreateItemSchemaType) {
  console.log('data is', data);
  const prisma = new PrismaClient();

  // validate zod here
  const validatedData = CreateItemSchema.parse(data);
  console.log('validatedData is', validatedData);
  // pass to prisma next

  const newItem = await prisma.item.create({
    data: validatedData,
  });

  console.log('newItem is', newItem);
  // no try..catch here

  return newItem;
}
