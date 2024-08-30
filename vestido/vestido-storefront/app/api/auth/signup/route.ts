import {
  makeJWTToken,
  signUp,
  verifyOTP,
  verifyUserExist,
} from '@vestido-ecommerce/auth';
import { apiRouteHandler, VestidoError } from '@vestido-ecommerce/utils';

export const POST = apiRouteHandler(async ({ request }) => {
  const body = await request.json();
  const mobile = body.mobile;
  const otp = body.otp;

  const verifyOtpBody = {
    mobile,
    otp,
  };

  const existingUser = await verifyUserExist({ mobile: mobile });
  if (existingUser) {
    throw new VestidoError({
      name: 'UserAlreadyExists',
      message: 'User already exist. Please proceed to login',
      httpStatus: 400,
      context: {
        mobile,
      },
    });
  }

  const isOtpVerfied = await verifyOTP(verifyOtpBody);
  if (!isOtpVerfied) {
    throw new VestidoError({
      name: 'OTPVerificationFailed',
      message: 'OTP verification failed',
      httpStatus: 400,
      context: {
        mobile,
        incomingOTP: otp,
      },
    });
  }

  const newUser = await signUp(body);
  const token = await makeJWTToken({
    id: newUser.id,
    fullName: `${newUser.firstName} ${newUser.lastName}`.trim(),
    email: newUser.email,
    mobile: newUser.mobile,
  });

  return {
    user: newUser,
    token,
  };
});
