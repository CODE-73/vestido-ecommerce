import { ZodError } from 'zod';

import { verifyPaymentExist } from '@vestido-ecommerce/orders';
import { verifySignature } from '@vestido-ecommerce/razorpay';

import { verifyAuth } from '../../verify-auth';

export async function POST(
  request: Request,
  { params }: { params: { paymentSlug: string } },
) {
  try {
    const auth = await verifyAuth(request);
    if (!auth.authenticated) {
      return new Response(JSON.stringify({ error: auth.reason }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    const body = await request.json();

    const isPaymentExist = await verifyPaymentExist(params.paymentSlug);

    if (!isPaymentExist) {
      return new Response(JSON.stringify({ error: 'Payment does not exist' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const isSignverified = await verifySignature(body);
    if (isSignverified) {
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Razorpay Signature verification is success',
        }),
        {
          headers: {
            'Content-Type': 'application.json',
          },
        },
      );
    } else {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'RazorPay Signature verification failed',
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
      return new Response(JSON.stringify(e), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } else {
      console.error('Unexpected Error', e);
      return new Response(
        JSON.stringify({
          success: false,
          error: e,
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
