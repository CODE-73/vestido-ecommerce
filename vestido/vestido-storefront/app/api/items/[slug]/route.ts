import { getItemDetails } from '@vestido-ecommerce/items';

export const dynamic = 'force-dynamic'; // static by default, unless reading the request

export async function GET(
  request: Request,
  { params }: { params: { slug: string } },
) {
  try {
    const item = await getItemDetails(params.slug);

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
