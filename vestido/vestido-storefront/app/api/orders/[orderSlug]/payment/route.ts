import { verifyAuth } from '../../../verify-auth';
import { ZodError } from 'zod';
import { createRazorpayOrder } from '@vestido-ecommerce/razorpay';

export async function POST(
  request: Request,
  { params }: { params: { orderSlug: string } }
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
    const rpOrderId = await createRazorpayOrder(body);
    console.log(rpOrderId);
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
        }
      );
    }
  }
}
