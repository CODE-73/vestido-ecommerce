import { createItem, listItem } from '@vestido-ecommerce/items';
import { ZodError } from 'zod';

export const dynamic = 'force-dynamic'; // static by default, unless reading the request

export async function GET(request: Request) {
  try {
    const items = await listItem();

    return new Response(JSON.stringify(items), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify(e), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('body is', body);

    // Call the createItem function with the validated request body
    const newItem = await createItem(body);

    const r = {
      data: newItem,
    };

    return new Response(JSON.stringify(r), {
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
