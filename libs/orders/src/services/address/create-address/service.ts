import { PrismaClient } from '@prisma/client';
import { CreateAddressSchema, CreateAddressSchemaType } from './zod';

export async function createAddress(body: CreateAddressSchemaType) {
  const prisma = new PrismaClient();

  // validate zod here
  const validatedData = CreateAddressSchema.parse(body);
  // pass to prisma next

  const newAddress = await prisma.customerAddress.create({
    data: {
      default: validatedData.default,
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      mobile: validatedData.mobile,
      line1: validatedData.line1,
      line2: validatedData.line2,
      district: validatedData.district,
      state: validatedData.state,
      pinCode: validatedData.pinCode,
      addressType: validatedData.addressType,
      customer: {
        connect: {
          id: validatedData.customerId,
        },
      },
    },
  });

  return newAddress;
}
