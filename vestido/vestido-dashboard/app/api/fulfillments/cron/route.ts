import { autoUpdateFulfillmentStatus } from '@vestido-ecommerce/orders';
import { apiRouteHandler } from '@vestido-ecommerce/utils';

// To prevent pre-rendering
export const dynamic = 'force-dynamic';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const GET = apiRouteHandler(async () => {
  await autoUpdateFulfillmentStatus();
  return { message: 'Fulfillments Updated Successfully' };
});
