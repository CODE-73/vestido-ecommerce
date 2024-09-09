import { authMiddleware, roleMiddleware } from '@vestido-ecommerce/auth';
import { getFulfillment, submitFulfillment } from '@vestido-ecommerce/orders';
import { apiRouteHandler, VestidoError } from '@vestido-ecommerce/utils';

export const POST = apiRouteHandler(
  authMiddleware,
  roleMiddleware('ADMIN'),
  async ({ params }) => {
    const isFulfillmentExist = await getFulfillment(params.fulfillmentId);

    if (!isFulfillmentExist) {
      throw new VestidoError({
        name: 'NotFoundError',
        message: 'Fulfillment does not exist',
        httpStatus: 404,
        context: {
          fulfillmentId: params.fulfillmentId,
        },
      });
    }
    const fulfillment = await submitFulfillment(params.fulfillmentId);
    return fulfillment;
  },
);
