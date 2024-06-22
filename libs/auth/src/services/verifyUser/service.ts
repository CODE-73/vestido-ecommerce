import { PrismaClient } from '@prisma/client';
import { SendOtpSchema, SendOtpSchemaType } from '../sendOtp';

export async function verifyUserExist(data: SendOtpSchemaType) {
  const prisma = new PrismaClient();

  const validatedData = SendOtpSchema.parse(data);

  const user = await prisma.profile.findUnique({
    where: {
      mobile: validatedData.mobile,
    },
  });

  return user;
}
