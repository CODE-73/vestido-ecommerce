// import { type NextRequest } from 'next/server';

import { listAdminOrders } from '@vestido-ecommerce/orders';

import { verifyAuth } from '../verify-auth';
// import { verifyAuth } from '../verify-auth';

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
    // const customerId = auth.profileId;
    const orders = await listAdminOrders();

    return new Response(JSON.stringify({ success: true, data: orders }), {
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
