import { ZodError } from 'zod';

import {
  makeJWTToken,
  verifyOTP,
  verifyUserExist,
} from '@vestido-ecommerce/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const user = await verifyUserExist(body);
    if (user && user.role === 'ADMIN') {
      const isOtpVerfied = await verifyOTP(body);
      if (isOtpVerfied) {
        const token = await makeJWTToken(user.id);
        return new Response(JSON.stringify({ success: true, user, token }), {
          headers: {
            'Content-Type': 'application.json',
          },
        });
      } else {
        return new Response(
          JSON.stringify({
            success: false,
            message: 'OTP verification failed',
          }),
          {
            headers: {
              'Content-Type': 'application.json',
            },
          },
        );
      }
    } else {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'User does not exist or User is not an admin user',
        }),
        {
          headers: {
            'Content-Type': 'application.json',
          },
        },
      );
    }
  } catch (e) {
    if (e instanceof ZodError) {
      return new Response(JSON.stringify({ success: false, error: e }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } else {
      console.error('Unexpected Error', e);
      return new Response(
        JSON.stringify({
          message: 'Unknown Error',
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    }
  }
}
