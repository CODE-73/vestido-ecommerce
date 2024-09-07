import { ZodError } from 'zod';

import { verifyPaymentExist } from '@vestido-ecommerce/orders';
import { processPayment } from '@vestido-ecommerce/razorpay';
import { cancelPayment } from '@vestido-ecommerce/razorpay';

import { verifyAuth } from '../../verify-auth';

export async function POST(
  request: Request,
  { params }: { params: { paymentId: string } },
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

    const isPaymentExist = await verifyPaymentExist(params.paymentId);

    if (!isPaymentExist) {
      return new Response(JSON.stringify({ error: 'Payment does not exist' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const isSignverified = await processPayment(body);
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

export async function PUT(
  request: Request,
  { params }: { params: { paymentId: string } },
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

    const isPaymentExist = await verifyPaymentExist(params.paymentId);

    if (!isPaymentExist) {
      return new Response(JSON.stringify({ error: 'Payment does not exist' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const payment = await cancelPayment(params.paymentId);
    return new Response(JSON.stringify({ success: true, data: payment }), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
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
