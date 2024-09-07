import { ZodError, ZodIssue } from 'zod';

export const VESTIDO_ERROR_KIND = 'VestidoError';

type VestidoErrorArgs = {
  message: string;
  name?: string;
  httpStatus?: number;
  context?: Record<string, unknown>;
};

/**
 * Custom Error class for Vestido
 *
 * - Default httpStatus is 500.
 * - You can pass in extra context if required.
 */
export class VestidoError extends Error {
  httpStatus: number;
  context: Record<string, unknown>;
  kind: string;

  constructor({
    message,
    name = 'VestidoError',
    httpStatus = 500,
    context = {},
  }: VestidoErrorArgs) {
    super(message);
    this.name = name;
    this.kind = VESTIDO_ERROR_KIND;
    this.context = context;
    this.httpStatus = httpStatus;
  }
}

export function isVestidoError(e: unknown): e is VestidoErrorArgs {
  if (!e || typeof e !== 'object') {
    return false;
  }

  return 'kind' in e && e.kind === VESTIDO_ERROR_KIND;
}

export async function handleVestidoErrorResponse(r: Response): Promise<never> {
  const body = await r.text();
  const defaultExc = new VestidoError({
    name: 'ErrorHandlingVestidoResponse',
    message: 'Unknown Error',
    httpStatus: 500,
    context: {
      status: r.status,
      statusText: r.statusText,
      body,
      url: r.url,
      headers: r.headers,
    },
  });

  let d: unknown;
  try {
    d = JSON.parse(body);
  } catch (e) {
    throw defaultExc;
  }

  if (!d || typeof d !== 'object') {
    throw defaultExc;
  }

  if ('message' in d && typeof d.message === 'string') {
    defaultExc.message = d.message;
  }

  if ('error' in d && typeof d.error === 'object' && d.error !== null) {
    if ('kind' in d.error && d.error.kind === VESTIDO_ERROR_KIND) {
      throw new VestidoError(d.error as unknown as VestidoErrorArgs);
    } else if (
      'name' in d.error &&
      d.error.name === 'ZodError' &&
      'issues' in d.error
    ) {
      throw new ZodError((d.error.issues as unknown as ZodIssue[]) ?? []);
    }
  }

  throw defaultExc;
}
