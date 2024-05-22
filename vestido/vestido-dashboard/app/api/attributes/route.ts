import { createAttribute } from '@vestido-ecommerce/items';
import { ZodError } from 'zod';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newAttribute = await createAttribute(body);

    return new Response(JSON.stringify({ success: true, newAttribute }), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
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
      return (
        new Response(
          JSON.stringify({
            success: false,
            message: 'Unknown Error',
          })
        ),
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
