import { handleRazorpayWebhook } from '@vestido-ecommerce/razorpay';
import { apiRouteHandler } from '@vestido-ecommerce/utils';

export const POST = apiRouteHandler(async ({ request }) => {
  const body = await request.json();
  const signature = request.headers.get('x-razorpay-signature');
  body.signature = signature;
  await handleRazorpayWebhook(body);

  return true;
});
