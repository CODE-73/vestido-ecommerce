import {
  activateValidCoupons,
  deactivateExpiredCoupons,
} from '@vestido-ecommerce/coupons';
import { apiRouteHandler } from '@vestido-ecommerce/utils';

export const GET = apiRouteHandler(async () => {
  // Deactivate expired coupons
  await deactivateExpiredCoupons();

  // Activate valid coupons
  await activateValidCoupons();

  return { message: 'Coupons updated successfully' };
});
