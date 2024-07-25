import {
  createAttribute,
  listAttribute,
  ListAttributesResponse,
} from '@vestido-ecommerce/items';
import { ZodError } from 'zod';
import { type NextRequest } from 'next/server';
import { VestidoResponse } from '@vestido-ecommerce/auth';

export async function GET(request: NextRequest) {
  try {
    const args = Object.fromEntries(request.nextUrl.searchParams.entries());
    const attributes = await listAttribute(args);

    return new Response(
      JSON.stringify({
        success: true,
        data: attributes,
      } as VestidoResponse<ListAttributesResponse>),
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
      } as VestidoResponse<ListAttributesResponse>),
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
    const newAttribute = await createAttribute(body);

    return new Response(JSON.stringify({ success: true, data: newAttribute }), {
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
      return (
        new Response(
          JSON.stringify({
            success: false,
            message: 'Unknown Error',
          }),
        ),
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
