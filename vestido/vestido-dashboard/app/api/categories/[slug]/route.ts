import { ZodError } from 'zod';

import {
  categoryDetails,
  deleteCategory,
  updateCategory,
} from '@vestido-ecommerce/items';

export const dynamic = 'force-dynamic'; // static by default, unless reading the request

export async function GET(
  request: Request,
  { params }: { params: { slug: string } },
) {
  try {
    const category = await categoryDetails(params.slug);
    return new Response(
      JSON.stringify({
        success: true,
        data: category,
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
  const data = await request.json();

  try {
    const r = await updateCategory(params.slug, data);

    return new Response(
      JSON.stringify({
        success: true,
        data: r,
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
          success: false,
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

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } },
) {
  try {
    const deletedcategory = await deleteCategory(params.slug);

    return new Response(
      JSON.stringify({
        success: true,
        deleted: deletedcategory,
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
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }
}
