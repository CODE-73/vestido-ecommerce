import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN_PREFIX = process.env['NEXT_PUBLIC_SENTRY_DSN'] as string;
const SENTRY_PROJECT_ID = process.env[
  'NEXT_PUBLIC_SENTRY_PROJECT_ID'
] as string;

export async function register() {
  Sentry.init({
    dsn: `${SENTRY_DSN_PREFIX}/${SENTRY_PROJECT_ID}`,
  });
}

export default register;
