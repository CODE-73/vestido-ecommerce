import { authMiddleware, roleMiddleware } from '@vestido-ecommerce/auth';
import { getPickupLoc } from '@vestido-ecommerce/orders';
import { apiRouteHandler } from '@vestido-ecommerce/utils';

export const GET = apiRouteHandler(
  authMiddleware,
  roleMiddleware('ADMIN'),
  async () => {
    const pickupLocations = await getPickupLoc();

    return pickupLocations;
  },
);
