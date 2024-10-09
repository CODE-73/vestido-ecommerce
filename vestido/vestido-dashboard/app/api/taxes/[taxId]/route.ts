import { authMiddleware, roleMiddleware } from '@vestido-ecommerce/auth';
import { deleteTax, getTax, updateTax } from '@vestido-ecommerce/tax';
import { apiRouteHandler, VestidoError } from '@vestido-ecommerce/utils';

export const GET = apiRouteHandler(
  authMiddleware,
  roleMiddleware('ADMIN'),
  async ({ params }) => {
    const tax = await getTax(params.taxId);
    return tax;
  },
);

export const PUT = apiRouteHandler(
  authMiddleware,
  roleMiddleware('ADMIN'),
  async ({ request, params }) => {
    const body = await request.json();

    const isTaxExist = await getTax(params.taxId);
    if (!isTaxExist) {
      throw new VestidoError({
        name: 'NotFoundError',
        message: 'Tax does not exist',
        httpStatus: 404,
        context: {
          taxId: params.taxId,
        },
      });
    }
    const tax = await updateTax(params.taxId, body);
    return tax;
  },
);

export const DELETE = apiRouteHandler(
  authMiddleware,
  roleMiddleware('ADMIN'),
  async ({ params }) => {
    const deletedTax = await deleteTax(params.taxId);
    return deletedTax;
  },
);
