import { generateCategorySearchTerms } from '@vestido-ecommerce/items';

import { verifyAuth } from '../../../verify-auth';

export async function GET(
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

    const r = await generateCategorySearchTerms(params.slug);

    return new Response(JSON.stringify(r), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (e: Error | unknown) {
    return new Response(
      JSON.stringify({
        success: false,
        error: e && typeof e === 'object' && 'message' in e ? e.message : e,
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
