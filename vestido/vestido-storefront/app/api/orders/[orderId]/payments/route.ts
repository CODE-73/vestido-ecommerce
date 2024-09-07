import { getOrder } from '@vestido-ecommerce/orders';
import { createRazorpayOrder } from '@vestido-ecommerce/razorpay';
import { apiRouteHandler, VestidoError } from '@vestido-ecommerce/utils';

export const POST = apiRouteHandler(async ({ request, params }) => {
  const body = await request.json();
  const isOrderExist = await getOrder(params.orderId);
  if (!isOrderExist) {
    throw new VestidoError({
      name: 'NotFoundError',
      message: 'Order does not exist',
      httpStatus: 404,
      context: {
        orderId: params.orderId,
      },
    });
  }
  const rpOrderId = await createRazorpayOrder(body);

  return rpOrderId;
});
