import { authMiddleware, getAuthContext } from '@vestido-ecommerce/auth';
import {
  addToWishlist,
  listWishlistItems,
  removeFromWishlist,
} from '@vestido-ecommerce/items';
import { apiRouteHandler } from '@vestido-ecommerce/utils';

export const dynamic = 'force-dynamic'; // static by default, unless reading the request

export const GET = apiRouteHandler(authMiddleware, async () => {
  const customerId = getAuthContext().profileId;
  const wishlistItems = await listWishlistItems(customerId);

  return wishlistItems;
});

export const POST = apiRouteHandler(authMiddleware, async ({ request }) => {
  const customerId = getAuthContext().profileId;
  const body = await request.json();
  body.customerId = customerId;

  await addToWishlist(body);
  const wishlistItems = await listWishlistItems(customerId);
  return wishlistItems;
});

export const DELETE = apiRouteHandler(authMiddleware, async ({ request }) => {
  const customerId = getAuthContext().profileId;
  const params = new URL(request.url).searchParams;
  const itemId = params.get('itemId') ?? '';

  const body = {
    itemId,
    customerId,
  };

  await removeFromWishlist(body);
  const wishlistItems = await listWishlistItems(customerId);
  return wishlistItems;
});
