import { generateOTP } from '@vestido-ecommerce/caching';
import { SendOtpSchemaType, SendOtpSchema } from './zod';
import { verifyUserExist } from '../verifyUser';

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
