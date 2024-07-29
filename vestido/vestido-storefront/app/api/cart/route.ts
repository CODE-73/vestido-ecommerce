import { ZodError } from 'zod';

import {
  addToCart,
  listCartItems,
  removeFromCart,
} from '@vestido-ecommerce/items';

import { verifyAuth } from '../verify-auth';

export const dynamic = 'force-dynamic'; // static by default, unless reading the request

export async function GET(request: Request) {
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
    const customerId = auth.profileId;
    const cartItems = await listCartItems(customerId);

    return new Response(JSON.stringify({ success: true, data: cartItems }), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (e) {
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
    const cartItems = await addToCart({
      customerId: auth.profileId,
      itemId: body.itemId,
      qty: body.qty,
      variantId: body.variantId,
    });

    return new Response(JSON.stringify({ success: true, data: cartItems }), {
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
          success: false,
          message: 'Unknown Error',
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

export async function DELETE(request: Request) {
  try {
    const params = new URL(request.url).searchParams;

    const auth = await verifyAuth(request);
    if (!auth.authenticated) {
      return new Response(JSON.stringify({ error: auth.reason }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    const customerId = auth.profileId;
    const body = {
      itemId: params.get("itemId"),
      customerId,
      variantId: params.get("variantId"),
      actionType: params.get("actionType")
    };

    await removeFromCart(body);

    const cartItems = await listCartItems(customerId);

    return new Response(JSON.stringify({ success: true, cartItems }), {
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
        },
      );
    }
  }
}
