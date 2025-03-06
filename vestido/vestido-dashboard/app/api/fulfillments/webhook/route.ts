import { refreshOrderStatus } from '@vestido-ecommerce/orders';
import { handleShiprocketWebhook } from '@vestido-ecommerce/shiprocket';
import { apiRouteHandler } from '@vestido-ecommerce/utils';

export const POST = apiRouteHandler(async ({ request }) => {
  const body = await request.json();
  const token = request.headers.get('x-api-key');
  body.token = token;

  const target = await handleShiprocketWebhook(body);
  if (target && target.type === 'Fulfillment') {
    await refreshOrderStatus({
      id: target.id,
      type: 'fulfillmentStatus',
    });
  }

  if (target && target.type === 'Return') {
    await refreshOrderStatus({
      id: target.id,
      type: 'ReturnStatus',
    });
  }
  return {
    target,
  };
});
