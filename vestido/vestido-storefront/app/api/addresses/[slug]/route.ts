import { authMiddleware, getAuthContext } from '@vestido-ecommerce/auth';
import {
  deleteAddress,
  getAddress,
  updateAddress,
} from '@vestido-ecommerce/orders';
import { apiRouteHandler } from '@vestido-ecommerce/utils';

export const dynamic = 'force-dynamic'; // static by default, unless reading the request

export const GET = apiRouteHandler(authMiddleware, async ({ params }) => {
  const address = await getAddress(params.slug);
  return address;
});

export const PUT = apiRouteHandler(
  authMiddleware,
  async ({ request, params }) => {
    const body = await request.json();
    const customerId = getAuthContext().profileId;
    const updatedAddress = await updateAddress(params.slug, {
      ...body,
      customerId,
    });
    return updatedAddress;
  },
);

export const DELETE = apiRouteHandler(authMiddleware, async ({ params }) => {
  const deletedAddress = await deleteAddress(params.slug);
  return deletedAddress;
});
