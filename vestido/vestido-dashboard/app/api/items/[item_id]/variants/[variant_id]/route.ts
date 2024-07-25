import {
  variantDetails,
  updateVariant,
  deleteVariant,
} from '@vestido-ecommerce/items';
import { ZodError } from 'zod';

export const dynamic = 'force-dynamic'; // static by default, unless reading the request

export async function GET(
  request: Request,
  { params }: { params: { variant_id: string } }
) {
  try {
    const variant = await variantDetails(params.variant_id);

    return new Response(
      JSON.stringify({
        success: true,
        data: variant,
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

export async function PUT(
  request: Request,
  { params }: { params: { item_id: string; variant_id: string } }
) {
  const body = await request.json();

  try {
    const r = await updateVariant(params.variant_id, body);

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
          message: e,
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
export async function DELETE(
  request: Request,
  { params }: { params: { item_id: string; variant_id: string } }
) {
  try {
    await deleteVariant(params.variant_id);

    return new Response(JSON.stringify({ success: true }), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (e) {
    console.error(e);
    return new Response(
      JSON.stringify({
        success: false,
      }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
