import { getPrismaClient } from '@vestido-ecommerce/models';
import { SignUpSchema, SignUpSchemaType } from './zod';

export async function signUp(data: SignUpSchemaType) {
  const prisma = getPrismaClient();

  const validatedData = SignUpSchema.parse(data);

  const user = await prisma.profile.create({
    data: {
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      mobile: validatedData.mobile,
    },
  });

  return user;
}
