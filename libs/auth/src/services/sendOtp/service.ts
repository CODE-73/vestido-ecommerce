import { generateOTP } from '@vestido-ecommerce/caching';
import { sendSMS, SMSSenderID, SMSTemplate } from '@vestido-ecommerce/fast2sms';

import { verifyUserExist } from '../verifyUser';
import { SendOtpSchema, SendOtpSchemaType } from './zod';

const IS_DEVELOPMENT = process.env['NODE_ENV'] === 'development';

export async function sendOTP(data: SendOtpSchemaType) {
  const { mobile } = SendOtpSchema.parse(data);

  const otp = await generateOTP(mobile);

  if (!IS_DEVELOPMENT) {
    await sendSMS({
      senderId: SMSSenderID.BVSTID,
      template: SMSTemplate.OTP_SMS,
      variables: [otp],
      recipients: [mobile],
    });
  } else {
    console.info('OTP:', mobile, otp);
  }

  const user = await verifyUserExist({ mobile: mobile });
  const userExists = !!user;

  return {
    otp,
    userExists,
  };
}
