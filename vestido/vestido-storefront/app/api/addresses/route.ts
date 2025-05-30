import {
  authMiddleware,
  getAuthContext,
  roleMiddleware,
} from '@vestido-ecommerce/auth';
import { createAddress, listAddress } from '@vestido-ecommerce/orders';
import { apiRouteHandler } from '@vestido-ecommerce/utils';

export const GET = apiRouteHandler(
  authMiddleware,
  roleMiddleware('CUSTOMER'),
  async () => {
    const customerId = getAuthContext().profileId;
    const addresses = await listAddress(customerId);
    return addresses;
  },
);

export const POST = apiRouteHandler(
  authMiddleware,
  roleMiddleware('CUSTOMER'),
  async ({ request }) => {
    const body = await request.json();
    const customerId = getAuthContext().profileId;

    // Call the createAddress function with the validated request body
    const newAddress = await createAddress({
      ...body,
      customerId,
    });

    return newAddress;
  },
);
