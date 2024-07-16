import { createClient } from 'redis';
import { SendOtpSchemaType, SendOtpSchema } from './zod';
import { verifyUserExist } from '../verifyUser';

export async function sendOTP(data: SendOtpSchemaType) {
  const redis = createClient({
    url: process.env['REDIS_URL'],
  });

  redis.on('error', (err) => console.log('Redis Client Error', err));

  await redis.connect();

  const { mobile } = SendOtpSchema.parse(data);

  let otp = await redis.get(mobile);

  if (!otp) {
    // otp = Math.floor(100000 + Math.random() * 900000).toString();
    otp = mobile.slice(-6);

    await redis.set(mobile, otp);

    await redis.expire(mobile, 300);
  }

  console.info('OTP:', mobile, otp);
  const user = await verifyUserExist({ mobile: mobile });
  const userExists = !!user; // Convert the user object to a boolean

  return {
    otp,
    userExists,
  };
}
