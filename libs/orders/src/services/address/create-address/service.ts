import { PrismaClient } from '@prisma/client';
import { CreateAddressSchema, CreateAddressSchemaType } from './zod';

export async function createAddress(data: CreateAddressSchemaType) {
  const prisma = new PrismaClient();

  // validate zod here
  const validatedData = CreateAddressSchema.parse(data);
  // pass to prisma next

  const newAddress = await prisma.customerAddress.create({
    data: validatedData,
  });

  return newAddress;
}
