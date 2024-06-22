import { createAddress } from '@vestido-ecommerce/orders';
import { ZodError } from 'zod';

export const dynamic = 'force-dynamic'; // static by default, unless reading the request

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Call the createAddress function with the validated request body
    const newAddress = await createAddress(body);

    const r = newAddress;

    return new Response(
      JSON.stringify({
        success: true,
        data: r,
      }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (e) {
    if (e instanceof ZodError) {
      return new Response(
        JSON.stringify({
          succcess: false,
          error: e,
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
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
