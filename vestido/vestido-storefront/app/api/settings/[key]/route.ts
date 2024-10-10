import { authMiddleware, roleMiddleware } from '@vestido-ecommerce/auth';
import { getSettings } from '@vestido-ecommerce/settings';
import { apiRouteHandler } from '@vestido-ecommerce/utils';

export const GET = apiRouteHandler(
  authMiddleware,
  roleMiddleware('ADMIN'),
  async ({ params }) => {
    const settings = await getSettings(params.key);
    console.log('settings', settings);
    return settings;
  },
);
