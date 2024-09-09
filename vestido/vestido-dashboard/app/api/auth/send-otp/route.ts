import {
  sendOTP,
  SendOtpSchema,
  verifyUserExist,
} from '@vestido-ecommerce/auth';
import { apiRouteHandler, VestidoError } from '@vestido-ecommerce/utils';

export const POST = apiRouteHandler(async ({ request }) => {
  const body = await request.json();

  const { mobile } = SendOtpSchema.parse(body);
  const user = await verifyUserExist({ mobile: mobile });

  if (!user || user.role !== 'ADMIN') {
    throw new VestidoError({
      name: 'UserNotFound',
      message: 'User does not exist',
      httpStatus: 404,
      context: {
        mobile: mobile,
      },
    });
  }

  const r = await sendOTP(body);

  return {
    userExists: r.userExists,
    // TODO: Remove me once in Production
    otp: r.otp,
  };
});
