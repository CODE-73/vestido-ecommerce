import { autoUpdateFulfillmentStatus } from '@vestido-ecommerce/orders';
import { apiRouteHandler } from '@vestido-ecommerce/utils';

export const GET = apiRouteHandler(async () => {
  await autoUpdateFulfillmentStatus();
  return { message: 'Fulfillments Updated Successfully' };
});
