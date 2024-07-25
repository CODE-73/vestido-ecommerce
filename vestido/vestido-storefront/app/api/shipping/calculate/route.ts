import { ZodError } from 'zod';
import { verifyAuth } from '../../verify-auth';
import { calculateShippingCharges } from '@vestido-ecommerce/orders';

export async function POST(request: Request) {
  try {
    const auth = await verifyAuth(request);
    if (!auth.authenticated) {
      return new Response(JSON.stringify({ error: auth.reason }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const body = await request.json();
    const shipping = await calculateShippingCharges(body);
    if (!body.paymentType || !body.shippingAddressId) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid input parameters' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        data: shipping,
      }),
      { headers: { 'Content-Type': 'application/json' } },
    );
  } catch (e) {
    if (e instanceof ZodError) {
      return new Response(
        JSON.stringify({ success: false, error: e.message }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      );
    } else {
      console.error('Unexpected Error', e);
      return new Response(
        JSON.stringify({ success: false, message: 'Unknown Error' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } },
      );
    }
  }
}
