import { ZodError } from 'zod';

import { getOrder } from '@vestido-ecommerce/orders';
import { createRazorpayOrder } from '@vestido-ecommerce/razorpay';

import { verifyAuth } from '../../../verify-auth';

export async function POST(
  request: Request,
  { params }: { params: { orderId: string } },
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

    const isOrderExist = await getOrder(params.orderId);

    if (!isOrderExist) {
      return new Response(JSON.stringify({ error: 'Order does not exist' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    const rpOrderId = await createRazorpayOrder(body);
    return new Response(JSON.stringify({ success: true, data: rpOrderId }), {
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