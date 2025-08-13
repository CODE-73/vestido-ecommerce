import { getOTP } from '@vestido-ecommerce/caching';
import { getPrismaClient } from '@vestido-ecommerce/models';
import { createAuthLog } from '@vestido-ecommerce/utils';

import { loginSchema, loginSchemaType } from './../login';

export async function verifyOTP(data: loginSchemaType) {
  const validatedData = loginSchema.parse(data);
  const otp = await getOTP(validatedData.mobile);
  const prisma = getPrismaClient();

  const isOTPValid = validatedData.otp === otp;

  const profile = await prisma.profile.findUnique({
    where: {
      mobile: validatedData.mobile,
    },
    select: { id: true },
  });

  if (profile) {
    await createAuthLog(profile.id, 'AUTHENTICATED');
  }

  return isOTPValid;
}
