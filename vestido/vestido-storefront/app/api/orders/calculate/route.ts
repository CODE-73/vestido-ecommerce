import { authMiddleware, roleMiddleware } from '@vestido-ecommerce/auth';
import { calculateTotal } from '@vestido-ecommerce/orders';
import { apiRouteHandler } from '@vestido-ecommerce/utils';

export const POST = apiRouteHandler(
  authMiddleware,
  roleMiddleware('CUSTOMER'),
  async ({ request }) => {
    const body = await request.json();
    const totalPrice = await calculateTotal(body);

    return totalPrice;
  },
);
