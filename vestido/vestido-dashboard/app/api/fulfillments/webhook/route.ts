import { handleShiprocketWebhook } from '@vestido-ecommerce/shiprocket';
import { apiRouteHandler } from '@vestido-ecommerce/utils';

export const POST = apiRouteHandler(async ({ request }) => {
  const body = await request.json();
  const token = request.headers.get('x-api-key');
  body.token = token;
  await handleShiprocketWebhook(body);

  return true;
});
