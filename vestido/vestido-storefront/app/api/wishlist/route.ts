import {
  listWishlistItems,
  addToWishlist,
  removeFromWishlist,
} from '@vestido-ecommerce/items';
import { json } from 'stream/consumers';
import { ZodError } from 'zod';

export const dynamic = 'force-dynamic'; // static by default, unless reading the request

let customerId = 'f47ac10b-58cc-4372-a567-0e02b2c3d479';

export async function GET(request: Request) {
  try {
    const wishlistItems = await listWishlistItems(customerId);

    return new Response(JSON.stringify({ success: true, wishlistItems }), {
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

    body.customerId = customerId;

    await addToWishlist(body);

    const wishlistItems = await listWishlistItems(customerId);

    return new Response(JSON.stringify({ success: true, wishlistItems }), {
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

export async function DELETE(request: Request) {
  try {
    const params = new URL(request.url).searchParams;
    const itemId = params.get('itemId') ?? '';

    const body = {
      itemId,
      customerId,
    };

    await removeFromWishlist(body);

    const wishlistItems = await listWishlistItems(customerId);

    return new Response(JSON.stringify({ success: true, wishlistItems }), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (e) {
    if (e instanceof ZodError) {
      return new Response(JSON.stringify({ success: false, e }), {
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
