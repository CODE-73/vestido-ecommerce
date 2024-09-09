import { authMiddleware, roleMiddleware } from '@vestido-ecommerce/auth';
import { calculateShippingCharges } from '@vestido-ecommerce/orders';
import { apiRouteHandler, VestidoError } from '@vestido-ecommerce/utils';

export const POST = apiRouteHandler(
  authMiddleware,
  roleMiddleware('CUSTOMER'),
  async ({ request }) => {
    const body = await request.json();
    if (!body.paymentType || !body.shippingAddressId) {
      throw new VestidoError({
        name: 'InvalidInputParameters',
        message: 'Invalid input parameters',
        httpStatus: 400,
        context: {
          paymentType: body.paymentType,
          shippingAddressId: body.shippingAddressId,
        },
      });
    }

    const shipping = await calculateShippingCharges(body);
    return shipping;
  },
);
