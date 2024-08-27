//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');
const { withSentryConfig: _withSentryConfig } = require('@sentry/nextjs');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  experimental: {
    appDir: true,
    instrumentationHook: true,
  },
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve = {
        ...config.resolve,
        fallback: {
          // fixes proxy-agent dependencies
          net: false,
          dns: false,
          tls: false,
          assert: false,
          // fixes next-i18next dependencies
          path: false,
          fs: false,
          // fixes mapbox dependencies
          events: false,
          // fixes sentry dependencies
          process: false,
        },
      };
    }
    return config;
  },
  images: {
    unoptimized: process.env.DISABLE_IMAGE_OPTIMIZATIONS === 'true',
    domains: [
      'vestido.45fff1c9b9ec39d339c480173cd09d22.r2.cloudflarestorage.com',
    ],
  },
};

const SENTRY_OPTIONS = {
  // Sentry webpack plugin options here
  silent: true,
  org: process.env.NEXT_PUBLIC_SENTRY_ORG,
  project: process.env.NEXT_PUBLIC_SENTRY_PROJECT,
};

/**
 * Custom withSentryConfig compatible with nx's composePlugins
 *
 * @param {import('@nx/next/plugins/with-nx').WithNxOptions} config
 * @returns {import('@nx/next/plugins/with-nx').WithNxOptions}
 */
const withSentryConfig = (config) => _withSentryConfig(config, SENTRY_OPTIONS);

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
  // Sentry should be the last plugin to wrap all others
  withSentryConfig,
];

module.exports = composePlugins(...plugins)(nextConfig);
