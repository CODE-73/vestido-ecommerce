import {
  makeJWTToken,
  verifyOTP,
  verifyUserExist,
} from '@vestido-ecommerce/auth';
import { apiRouteHandler, VestidoError } from '@vestido-ecommerce/utils';

export const POST = apiRouteHandler(async ({ request }) => {
  const body = await request.json();
  const user = await verifyUserExist(body);

  if (!user) {
    throw new VestidoError({
      name: 'UserNotFound',
      message: 'User does not exist.',
      httpStatus: 404,
      context: {
        site: 'dashboard',
        mobile: body.mobile,
        email: body.email,
      },
    });
  }

  if (user.role !== 'ADMIN') {
    throw new VestidoError({
      name: 'NonAdminUserDashboardLogin',
      message: 'Non Admin User Dashboard Login is not allowed',
      httpStatus: 400,
      context: {
        user: user.id,
        role: user.role,
      },
    });
  }

  const isOtpVerfied = await verifyOTP(body);
  if (!isOtpVerfied) {
    throw new VestidoError({
      name: 'OTPVerificationFailed',
      message: 'OTP verification failed',
      httpStatus: 400,
      context: {
        mobile: body.mobile,
        incomingOTP: body.otp,
      },
    });
  }

  const token = await makeJWTToken({
    id: user.id,
    fullName: `${user.firstName} ${user.lastName}`.trim(),
    email: user.email,
    mobile: user.mobile,
    role: user.role,
  });

  return {
    user,
    token,
  };
});
