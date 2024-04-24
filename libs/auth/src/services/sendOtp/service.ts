import { createClient } from 'redis';
import { SendOtpSchemaType, SendOtpSchema } from './zod';

export async function sendOTP(data: SendOtpSchemaType) {
  const redis = createClient({
    url: process.env['REDIS_URL'],
  });

  redis.on('error', (err) => console.log('Redis Client Error', err));

  await redis.connect();

  const validatedData = SendOtpSchema.parse(data);

  const mobileNumber = validatedData.mobile;

  const otp = await redis.get(mobileNumber);

  if (!otp) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await redis.set(mobileNumber, otp);

    await redis.expire(mobileNumber, 300);

    return otp;
  } else {
    return otp;
  }
}
