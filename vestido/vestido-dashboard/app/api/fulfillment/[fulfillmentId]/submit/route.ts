import { ZodError } from 'zod';

import { getFulfillment, submitFulfillment } from '@vestido-ecommerce/orders';

import { verifyAuth } from '../../../verify-auth';

export async function POST(
  request: Request,
  { params }: { params: { fulfillmentId: string } },
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

    const isFulfillmentExist = await getFulfillment(params.fulfillmentId);

    if (!isFulfillmentExist) {
      return new Response(
        JSON.stringify({ error: 'Fulfillment does not exist' }),
        {
          status: 404,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    }
    const fulfillment = await submitFulfillment(params.fulfillmentId, body);
    return new Response(JSON.stringify({ success: true, data: fulfillment }), {
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
          success: false,
          error: e instanceof Error ? e.message : 'Unknown error occurred',
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