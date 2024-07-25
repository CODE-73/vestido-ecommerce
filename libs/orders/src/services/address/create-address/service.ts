import { getPrismaClient } from '@vestido-ecommerce/models';

import { CreateAddressSchema, CreateAddressSchemaType } from './zod';

export async function createAddress(body: CreateAddressSchemaType) {
  const prisma = getPrismaClient();

  // validate zod here
  const validatedData = CreateAddressSchema.parse(body);

  if (validatedData.default) {
    // Update all existing addresses to set default to false
    await prisma.customerAddress.updateMany({
      where: {
        customerId: validatedData.customerId,
        default: true,
      },
      data: {
        default: false,
      },
    });
  }
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
