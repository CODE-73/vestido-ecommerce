import * as Sentry from '@sentry/nextjs';
import { AsyncLocalStorage } from 'async_hooks';
import * as jwt from 'jsonwebtoken';

import {
  captureSentryError,
  RouteHandlerMiddleware,
  VestidoError,
} from '@vestido-ecommerce/utils';

import { verifyJWTToken } from './services';

type AuthResponse = {
  authenticated: true;
  token: string;
  profileId: string;
  data: unknown;
};

const authStorage = new AsyncLocalStorage<AuthResponse>();

export const authMiddleware: RouteHandlerMiddleware = async ({
  request,
  next,
}) => {
  try {
    const authorizationHeader = request.headers.get('Authorization');
    const token = authorizationHeader?.split(' ')[1];

    if (!token) {
      const err = new VestidoError({
        name: 'AuthTokenMissing',
        message: 'Token is missing',
        httpStatus: 401,
      });
      captureSentryError(err);
      return Response.json(
        {
          success: false,
          message: err.message,
          error: err,
        },
        { status: 401 },
      );
    }

    const profile = await verifyJWTToken(token as string);
    const status = {
      authenticated: true,
      token,
      profileId: profile.id,
      data: profile,
    } satisfies AuthResponse;

    Sentry.setUser({
      id: profile.id,
      email: profile.email || profile.mobile || '',
      username: profile.fullName,
    });

    return await new Promise((resolve, reject) => {
      authStorage.run(status, async () => {
        const r = await next().catch(reject);
        resolve(r);
      });
    });
  } catch (e) {
    if (isJWTException(e)) {
      throw new VestidoError({
        message: 'Invalid Token',
        name: 'AuthInvalidToken',
        httpStatus: 401,
      });
    } else {
      // Re-throw. It will be caught by the global error handler.
      throw e;
    }
  }
};

function isJWTException(e: unknown): e is jwt.VerifyErrors {
  if (
    e instanceof jwt.JsonWebTokenError ||
    e instanceof jwt.TokenExpiredError ||
    e instanceof jwt.NotBeforeError
  ) {
    return true;
  }
  return false;
}
