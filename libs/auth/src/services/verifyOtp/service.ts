import { getOTP } from '@vestido-ecommerce/caching';

import { loginSchema, loginSchemaType } from './../login';

export async function verifyOTP(data: loginSchemaType) {
  const validatedData = loginSchema.parse(data);
  const otp = await getOTP(validatedData.mobile);

  if (validatedData.otp == otp) {
    return true;
  } else {
    return false;
  }
}
