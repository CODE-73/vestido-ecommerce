import * as Sentry from '@sentry/nextjs';
import posthog from 'posthog-js';

const SENTRY_DSN_PREFIX = process.env['NEXT_PUBLIC_SENTRY_DSN'] as string;
const SENTRY_PROJECT_ID = process.env[
  'NEXT_PUBLIC_SENTRY_PROJECT_ID'
] as string;
const SENTRY_ORG = process.env['NEXT_PUBLIC_SENTRY_ORG'] as string;

if (SENTRY_DSN_PREFIX && SENTRY_PROJECT_ID && SENTRY_ORG) {
  Sentry.init({
    dsn: `${SENTRY_DSN_PREFIX}/${SENTRY_PROJECT_ID}`,
    integrations: [
      posthog.sentryIntegration({
        organization: SENTRY_ORG,
        projectId: parseInt(SENTRY_PROJECT_ID || '0'),
        severityAllowList: ['error', 'info'],
      }),
    ],
  });
}

export default Sentry.ErrorBoundary;
