import { itemDetails, updateItem, deleteItem } from '@vestido-ecommerce/items';
import { ZodError } from 'zod';

export const dynamic = 'force-dynamic'; // static by default, unless reading the request

export async function GET(
  request: Request,
  { params }: { params: { item_id: string } }
) {
  try {
    const item = await itemDetails(params.item_id);

    return new Response(
      JSON.stringify({
        success: true,
        data: item,
      }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
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

export async function PUT(
  request: Request,
  { params }: { params: { item_id: string } }
) {
  const body = await request.json();

  try {
    const r = await updateItem(params.item_id, body);

    return new Response(JSON.stringify(r), {
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
  { params }: { params: { item_id: string } }
) {
  try {
    await deleteItem(params.item_id);

    return new Response(JSON.stringify(params.item_id), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
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
