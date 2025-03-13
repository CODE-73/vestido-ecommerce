//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');
const { withSentryConfig: _withSentryConfig } = require('@sentry/nextjs');
const { version } = require('../../package.json');

const R2_NEXT_IMAGE_HOSTNAME = process.env.R2_NEXT_IMAGE_HOSTNAME || '';

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  experimental: {
    instrumentationHook: true,
  },
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('sharp');
    } else {
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
          // fixes sharp dependencies
          child_process: false,
        },
      };
    }
    return config;
  },
  images: {
    loader: 'custom',
    loaderFile: './cloudflare-loader.js',
    unoptimized: process.env.DISABLE_IMAGE_OPTIMIZATIONS === 'true',
    remotePatterns: [
      {
        hostname: R2_NEXT_IMAGE_HOSTNAME,
        protocol: 'https',
      },
      {
        hostname: 'lp2.hm.com',
        protocol: 'https',
        port: '',
      },
      {
        hostname: 'images.unsplash.com',
        protocol: 'https',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_APP_VERSION: version,
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
