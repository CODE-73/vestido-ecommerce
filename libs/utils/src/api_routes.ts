import * as Sentry from '@sentry/nextjs';
import { ZodError } from 'zod';
import { fromError } from 'zod-validation-error';

import { VestidoError } from './errors';

export type RouteHandlerMiddlewareNext = () => Promise<
  Response | unknown | void
>;
export type RouteHandlerMiddleware = (params: {
  request: Request;
  next: RouteHandlerMiddlewareNext;
  params: Record<string, string>;
}) => Promise<Response | unknown | void>;

export const apiRouteHandler =
  (...middleware: RouteHandlerMiddleware[]) =>
  async (
    request: Request,
    params: { params: Record<string, string> },
  ): Promise<Response> => {
    let result;

    try {
      const execMiddleware = async (i: number) => {
        if (i >= middleware.length) {
          return;
        }

        const r = await middleware[i]({
          request,
          next: async () => {
            return await execMiddleware(i + 1);
          },
          params: params.params ?? {},
        });

        // Allow returning simple js-objects as well.
        if (r instanceof Response) {
          return r;
        } else {
          return Response.json({
            success: true,
            data: r,
          });
        }
      };

      result = await execMiddleware(0);
    } catch (e) {
      if (e instanceof ZodError) {
        // User Validation Error
        const err = new VestidoError({
          message: fromError(e).toString(),
          name: 'ZodValidationError',
          httpStatus: 400,
          context: {
            zodError: e,
          },
        });
        captureSentryError(err);
        return Response.json(
          {
            success: false,
            message: err.message,
            error: e,
          },
          { status: 400 },
        );
      } else if (e instanceof VestidoError) {
        // Managed VestidoError
        captureSentryError(e);
        return Response.json(
          {
            success: false,
            message: e.message,
            error: e,
          },
          { status: e.httpStatus },
        );
      } else {
        // Unknown Error
        captureSentryError(e);
        return Response.json(
          {
            success: false,
            message: 'Internal Server Error',
            error: e,
          },
          { status: 500 },
        );
      }
    }

    if (!result) {
      // Atleast one of the middlewares should have returned a response
      throw new VestidoError({
        message: 'Internal Server Error',
        name: 'MiddlewareResultNotFound',
        httpStatus: 500,
        context: {
          url: request.url,
        },
      });
    }

    return result;
  };

export function captureSentryError(e: unknown) {
  if (e instanceof VestidoError) {
    Sentry.captureException(e, {
      contexts: {
        vestidoError: {
          ...e.context,
        },
      },
    });
    return;
  } else {
    Sentry.captureException(e);
  }
  console.error('SentryErrorCaptured:', e);
}
