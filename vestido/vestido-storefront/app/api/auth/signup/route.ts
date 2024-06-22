import {
  signUp,
  verifyOTP,
  verifyUserExist,
  makeJWTToken,
} from '@vestido-ecommerce/auth';
import { ZodError } from 'zod';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const mobile = body.mobile;
    const otp = body.otp;

    const verifyOtpBody = {
      mobile,
      otp,
    };

    const user = await verifyUserExist({ mobile: mobile });

    if (!user) {
      const isOtpVerfied = await verifyOTP(verifyOtpBody);

      if (isOtpVerfied) {
        const newUser = await signUp(body);
        const token = await makeJWTToken(newUser.id);

        return new Response(JSON.stringify({ success: true, newUser, token }), {
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
          }
        );
      }
    } else {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'User already exist. Please proceed to login',
        }),
        {
          headers: {
            'Content-Type': 'application.json',
          },
        }
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
        }
      );
    }
  }
}
