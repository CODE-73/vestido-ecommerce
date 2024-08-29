import { authMiddleware } from '@vestido-ecommerce/auth';
import {
  deleteItem,
  getItemDetails,
  updateItem,
} from '@vestido-ecommerce/items';
import { apiRouteHandler } from '@vestido-ecommerce/utils';

export const dynamic = 'force-dynamic'; // static by default, unless reading the request

export async function GET(
  request: Request,
  { params }: { params: { item_id: string } },
) {
  try {
    const item = await getItemDetails(params.item_id);

    return new Response(
      JSON.stringify({
        success: true,
        data: item,
      }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
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

export const PUT = apiRouteHandler(
  authMiddleware,
  async ({ request, params: { item_id } }) => {
    const body = await request.json();
    return await updateItem(item_id, body);
  },
);

export async function DELETE(
  request: Request,
  { params }: { params: { item_id: string } },
) {
  try {
    await deleteItem(params.item_id);

    return new Response(
      JSON.stringify({
        success: true,
        deleted: params.item_id,
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
