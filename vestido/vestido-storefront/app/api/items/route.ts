import { listItem } from '@vestido-ecommerce/items';
import { type NextRequest } from 'next/server';

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
