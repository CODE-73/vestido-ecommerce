import { authMiddleware } from '@vestido-ecommerce/auth';
import {
  deleteFulfillment,
  getFulfillment,
  updateFulfillment,
} from '@vestido-ecommerce/orders';
import { apiRouteHandler, VestidoError } from '@vestido-ecommerce/utils';

export const GET = apiRouteHandler(authMiddleware, async ({ params }) => {
  const fulfillment = await getFulfillment(params.fulfillmentId);
  return fulfillment;
});

export const PUT = apiRouteHandler(
  authMiddleware,
  async ({ request, params }) => {
    const body = await request.json();

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
    const fulfillment = await updateFulfillment(params.fulfillmentId, body);
    return fulfillment;
  },
);

export const DELETE = apiRouteHandler(authMiddleware, async ({ params }) => {
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

  const fulfillment = await deleteFulfillment(params.fulfillmentId);
  return fulfillment;
});
