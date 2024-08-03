import { ZodError } from 'zod';

import {
  deleteAddress,
  getAddress,
  updateAddress,
} from '@vestido-ecommerce/orders';

import { verifyAuth } from '../../verify-auth';

export const dynamic = 'force-dynamic'; // static by default, unless reading the request

export async function GET(
  request: Request,
  { params }: { params: { slug: string } },
) {
  try {
    const address = await getAddress(params.slug);
    return new Response(
      JSON.stringify({
        success: true,
        data: address,
      }),
      {
        headers: {
          'content-Type': 'application/json',
        },
      },
    );
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify(e), {
      status: 500,
      headers: {
        'content-Type': 'application/json',
      },
    });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { slug: string } },
) {
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
    const updatedAddress = await updateAddress(params.slug, {
      ...body,
      customerId: auth.profileId,
    });

    return new Response(
      JSON.stringify({
        success: true,
        data: updatedAddress,
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
          message: e,
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

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } },
) {
  try {
    const deletedAddress = await deleteAddress(params.slug);

    return new Response(
      JSON.stringify({ success: true, data: deletedAddress }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify(e), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
