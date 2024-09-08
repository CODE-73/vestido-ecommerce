import { Role } from '@prisma/client';

import { RouteHandlerMiddleware, VestidoError } from '@vestido-ecommerce/utils';

import { getAuthContext } from './auth';

export const roleMiddleware =
  (role: Role): RouteHandlerMiddleware =>
  ({ next }) => {
    const auth = getAuthContext();
    if (!auth.authenticated) {
      throw new VestidoError({
        name: 'AuthRoleNotAuthorized',
        message: 'User is not authorized to access this resource',
        httpStatus: 401,
      });
    }

    if (auth.data.role !== role) {
      throw new VestidoError({
        name: 'AuthRoleNotAuthorized',
        message: 'User is not authorized to access this resource',
        httpStatus: 401,
      });
    }

    return next();
  };
