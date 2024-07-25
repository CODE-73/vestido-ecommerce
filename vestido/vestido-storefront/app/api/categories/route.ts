import { type NextRequest } from 'next/server';

import { ZodError } from 'zod';

import { VestidoResponse } from '@vestido-ecommerce/auth';
import {
  createCategory,
  listCategories,
  ListCategoriesResponse,
} from '@vestido-ecommerce/items';

export async function GET(request: NextRequest) {
  try {
    const args = Object.fromEntries(request.nextUrl.searchParams.entries());
    const categories = await listCategories(args);

    return new Response(
      JSON.stringify({
        success: true,
        data: categories,
      } as VestidoResponse<ListCategoriesResponse>),
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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newCategory = await createCategory(body);

    const r = {
      data: newCategory,
    };

    return new Response(JSON.stringify(r), {
      headers: {
        'Content-Type': 'application/son',
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
        },
      );
    }
  }
}
