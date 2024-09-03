import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env['NEXT_PUBLIC_SENTRY_DSN'] as string;

export async function register() {
  console.info('Sentry Registered:', SENTRY_DSN);
  Sentry.init({
    dsn: SENTRY_DSN,
  });
}

export default register;
