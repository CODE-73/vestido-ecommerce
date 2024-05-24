import { ZodError } from 'zod';
import {
  attributeDetails,
  deleteAttribute,
  updateAttribute,
} from '@vestido-ecommerce/items';

export const dynamic = 'force-dynamic'; // static by default, unless reading the request

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const attribute = await attributeDetails(params.slug);
    return new Response(
      JSON.stringify({
        success: true,
        data: attribute,
      }),
      {
        headers: {
          'content-Type': 'application/json',
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
          'content-Type': 'application/json',
        },
      }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const data = await request.json();

  try {
    const r = await updateAttribute(params.slug, data);

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
      return new Response(
        JSON.stringify({
          success: true,
          error: e,
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
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

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const deletedAttribute = await deleteAttribute(params.slug);

    return new Response(
      JSON.stringify({ success: true, deleted: deletedAttribute }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
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
