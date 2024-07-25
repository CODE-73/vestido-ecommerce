import { getPrismaClient } from '@vestido-ecommerce/models';

import { SendOtpSchema, SendOtpSchemaType } from '../sendOtp';

export async function verifyUserExist(data: SendOtpSchemaType) {
  const prisma = getPrismaClient();

  const validatedData = SendOtpSchema.parse(data);

  const user = await prisma.profile.findUnique({
    where: {
      mobile: validatedData.mobile,
    },
  });

  return user;
}
