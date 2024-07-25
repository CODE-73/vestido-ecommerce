import { ZodError } from 'zod';

import { createAddress, listAddress } from '@vestido-ecommerce/orders';

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
    const addresses = await listAddress(customerId);

    return new Response(JSON.stringify({ success: true, data: addresses }), {
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

    // Call the createAddress function with the validated request body
    const newAddress = await createAddress({
      ...body,
      customerId: auth.profileId,
    });

    return new Response(
      JSON.stringify({
        success: true,
        data: newAddress,
      }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
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
        },
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
        },
      );
    }
  }
}
