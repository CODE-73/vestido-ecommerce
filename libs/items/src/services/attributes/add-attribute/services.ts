import { PrismaClient } from '@prisma/client';
import { CreateAttributeSchema, CreateAttributeSchemaType } from './zod';

export async function createAttribute(body: CreateAttributeSchemaType) {
  const prisma = new PrismaClient();

  const validatedData = CreateAttributeSchema.parse(body);

  const newAttribute = await prisma.itemAttribute.create({
    data: validatedData,
  });

  return newAttribute;
}
