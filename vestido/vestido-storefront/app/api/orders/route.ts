import {
  authMiddleware,
  getAuthContext,
  roleMiddleware,
} from '@vestido-ecommerce/auth';
import { createOrder, listOrder } from '@vestido-ecommerce/orders';
import { apiRouteHandler } from '@vestido-ecommerce/utils';

export const GET = apiRouteHandler(
  authMiddleware,
  roleMiddleware('CUSTOMER'),
  async () => {
    const auth = getAuthContext();
    const customerId = auth.profileId;
    const orders = await listOrder(customerId);

    return orders;
  },
);

export const POST = apiRouteHandler(
  authMiddleware,
  roleMiddleware('CUSTOMER'),
  async ({ request }) => {
    const auth = getAuthContext();
    const customerId = auth.profileId;
    const body = await request.json();

    const newOrder = await createOrder({ ...body, customerId });

    return newOrder;
  },
);
