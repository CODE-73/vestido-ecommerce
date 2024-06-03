import { createVariant, listVariants } from '@vestido-ecommerce/items';
import { ZodError } from 'zod';
// import { verifyAuth } from '../verify-auth';

export const dynamic = 'force-dynamic'; // static by default, unless reading the request

export async function GET(
  request: Request,
  { params }: { params: { item_id: string } }
) {
  try {
    const variants = await listVariants(params.item_id);

    return new Response(
      JSON.stringify({
        success: true,
        data: variants,
      }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (e) {
    console.error(e);
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

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Call the createItem function with the validated request body
    const newVariant = await createVariant(body);

    // const r = {
    //   data: newItem,
    // };
    const r = newVariant;

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
          success: false,
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
