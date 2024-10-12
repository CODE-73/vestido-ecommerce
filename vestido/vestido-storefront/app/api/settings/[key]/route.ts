import { getSettings } from '@vestido-ecommerce/settings';
import { apiRouteHandler } from '@vestido-ecommerce/utils';

export const GET = apiRouteHandler(async ({ params }) => {
  const settings = await getSettings(params.key);
  return settings;
});
