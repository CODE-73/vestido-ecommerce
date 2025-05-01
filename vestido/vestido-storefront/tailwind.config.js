const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

const { tailwindConfig } = require('../../dist/libs/shadcn-ui');

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...tailwindConfig,
  content: [
    join(
      __dirname,
      '{src,pages,app,modules,components,layouts}/**/*!(*.stories|*.spec).{ts,tsx,html}',
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    ...(tailwindConfig.theme ?? {}),
    extend: {
      ...(tailwindConfig.theme?.extend ?? {}),
      height: {
        ...(tailwindConfig.theme?.extend?.height ?? {}),
        'screen-minus-nav': 'calc(100vh - var(--navbar-height))',
      },
      margin: {
        ...(tailwindConfig.theme?.extend?.margin ?? {}),
        'top-margin-nav': 'calc(var(--navbar-height) + 0.8em)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography', require('tailwindcss-animate'))],
};
