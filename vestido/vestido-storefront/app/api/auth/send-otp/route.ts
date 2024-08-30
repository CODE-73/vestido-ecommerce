import { sendOTP } from '@vestido-ecommerce/auth';
import { apiRouteHandler } from '@vestido-ecommerce/utils';

export const POST = apiRouteHandler(async ({ request }) => {
  const body = await request.json();
  const r = await sendOTP(body);

  return {
    userExists: r.userExists,
    // TODO: Remove me once in Production
    otp: r.otp,
  };
});
