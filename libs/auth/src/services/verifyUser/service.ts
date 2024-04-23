import { PrismaClient } from '@prisma/client';
import { loginSchema, loginSchemaType } from '../login';

export async function verifyUserExist(data: loginSchemaType) {
  const prisma = new PrismaClient();

  const validatedData = loginSchema.parse(data);

  const user = await prisma.profile.findUnique({
    where: {
      mobile: validatedData.mobileNumber,
    },
  });

  return user;
}
