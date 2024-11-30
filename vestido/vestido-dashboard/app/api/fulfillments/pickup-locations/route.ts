import { authMiddleware, roleMiddleware } from '@vestido-ecommerce/auth';
import { getPickupLoc } from 'libs/orders/src/services/fulfillment/get-pickup-location';
import { apiRouteHandler } from '@vestido-ecommerce/utils';

export const GET = apiRouteHandler(
  authMiddleware,
  roleMiddleware('ADMIN'),
  async () => {
    const pickupLocations = await getPickupLoc();

    return pickupLocations;
  },
);
