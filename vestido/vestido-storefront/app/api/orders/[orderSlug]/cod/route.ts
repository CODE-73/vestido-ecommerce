import { ZodError } from 'zod';

import { createCOD, verifyOrderExist } from '@vestido-ecommerce/orders';

import { verifyAuth } from '../../../verify-auth';

export async function POST(
  request: Request,
  { params }: { params: { orderSlug: string } },
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

    const isOrderExist = await verifyOrderExist(params.orderSlug);

    if (!isOrderExist) {
      return new Response(JSON.stringify({ error: 'Order does not exist' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const paymentId = await createCOD(body);

    return new Response(
      JSON.stringify({ success: true, paymentId: paymentId }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
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
