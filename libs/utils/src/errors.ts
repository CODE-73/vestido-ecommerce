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

  constructor({
    message,
    name = 'VestidoError',
    httpStatus = 500,
    context = {},
  }: VestidoErrorArgs) {
    super(message);
    this.name = name;
    this.context = context;
    this.httpStatus = httpStatus;
  }
}
