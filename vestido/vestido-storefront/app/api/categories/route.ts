import { listCategories, createCategory } from '@vestido-ecommerce/items';
import { ZodError } from 'zod';

export async function GET(request: Request) {
  try {
    const categories = await listCategories();

    return new Response(JSON.stringify(categories), {
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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log(body);
    const newCategory = await createCategory(body);

    return new Response(JSON.stringify(newCategory), {
      headers: {
        'Content-Type': 'application/son',
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
