import { authMiddleware, getAuthContext } from '@vestido-ecommerce/auth';
import {
  addToCart,
  listCartItems,
  removeFromCart,
} from '@vestido-ecommerce/items';
import { apiRouteHandler } from '@vestido-ecommerce/utils';

export const dynamic = 'force-dynamic'; // static by default, unless reading the request

export const GET = apiRouteHandler(authMiddleware, async () => {
  const customerId = getAuthContext().profileId;
  const cartItems = await listCartItems(customerId);

  return cartItems;
});

export const POST = apiRouteHandler(authMiddleware, async ({ request }) => {
  const customerId = getAuthContext().profileId;
  const body = await request.json();
  const cartItems = await addToCart({
    customerId,
    itemId: body.itemId,
    qty: body.qty,
    variantId: body.variantId,
  });

  return cartItems;
});

export const DELETE = apiRouteHandler(authMiddleware, async ({ request }) => {
  const customerId = getAuthContext().profileId;
  const params = new URL(request.url).searchParams;

  const body = {
    itemId: params.get('itemId'),
    customerId,
    variantId: params.get('variantId'),
    actionType: params.get('actionType'),
  };

  await removeFromCart(body);

  const cartItems = await listCartItems(customerId);

  return cartItems;
});
