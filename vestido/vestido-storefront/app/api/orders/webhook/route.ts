import { ZodError } from 'zod';

import { handleRazorpayWebhook } from '@vestido-ecommerce/razorpay';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const signature = request.headers.get('x-razorpay-signature');
    body.signature = signature;
    await handleRazorpayWebhook(body);

    return new Response(null, {
      status: 200,
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
