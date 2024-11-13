import { handleRazorpayWebhook } from '@vestido-ecommerce/razorpay';
import { apiRouteHandler, VestidoError } from '@vestido-ecommerce/utils';

export const POST = apiRouteHandler(async ({ request }) => {
  const body = await request.json();
  const signature = request.headers.get('x-razorpay-signature');
  body.signature = signature;

  try {
    await handleRazorpayWebhook(body);
  } catch (e) {
    throw new VestidoError({
      name: 'RazorpayWebhookFailed',
      message: 'Razorpay webhook failed',
      httpStatus: 500,
      context: {
        body,
        error: e,
      },
    });
  }

  return true;
});
