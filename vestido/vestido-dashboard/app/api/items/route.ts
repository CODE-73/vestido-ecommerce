import { type NextRequest } from 'next/server';
import { createItem, listItem } from '@vestido-ecommerce/items';
import { ZodError } from 'zod';
// import { verifyAuth } from '../verify-auth';

export const dynamic = 'force-dynamic'; // static by default, unless reading the request

export async function GET(request: NextRequest) {
  try {
    const args = Object.fromEntries(request.nextUrl.searchParams.entries());
    const items = await listItem(args);

    return new Response(
      JSON.stringify({
        success: true,
        data: items,
      }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
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
      },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Call the createItem function with the validated request body
    const newItem = await createItem(body);

    // const r = {
    //   data: newItem,
    // };
    const r = newItem;

    return new Response(
      JSON.stringify({
        success: true,
        data: r,
      }),
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
