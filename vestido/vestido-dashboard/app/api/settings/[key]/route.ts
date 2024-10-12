import { authMiddleware, roleMiddleware } from '@vestido-ecommerce/auth';
import { getSettings, updateSettings } from '@vestido-ecommerce/settings';
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

export const PUT = apiRouteHandler(
  authMiddleware,
  roleMiddleware('ADMIN'),
  async ({ request }) => {
    const body = await request.json();

    const settings = await updateSettings(body);
    return settings;
  },
);
