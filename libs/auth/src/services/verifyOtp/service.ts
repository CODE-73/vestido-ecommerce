import { createClient } from 'redis';
import { loginSchema, loginSchemaType } from './../login';

export async function verifyOTP(data: loginSchemaType) {
  const redis = createClient({
    url: process.env['REDIS_URL'],
  });

  await redis.connect();

  const validatedData = loginSchema.parse(data);

  const storedOtp = await redis.get(validatedData.mobileNumber);

  if (validatedData.otp == storedOtp) {
    return true;
  } else {
    return false;
  }
}
