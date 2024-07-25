import { generateOTP } from '@vestido-ecommerce/caching';

import { verifyUserExist } from '../verifyUser';
import { SendOtpSchema, SendOtpSchemaType } from './zod';

export async function sendOTP(data: SendOtpSchemaType) {
  const { mobile } = SendOtpSchema.parse(data);

  const otp = await generateOTP(mobile);
  console.info('OTP:', mobile, otp);

  const user = await verifyUserExist({ mobile: mobile });
  const userExists = !!user;

  return {
    otp,
    userExists,
  };
}
