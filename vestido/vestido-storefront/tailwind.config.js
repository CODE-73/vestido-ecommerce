const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

const { tailwindConfig } = require('../../dist/libs/shadcn-ui');

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...tailwindConfig,
  content: [
    join(
      __dirname,
      '{src,pages,app,modules,components,layouts}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  plugins: [
    require('@tailwindcss/typography'),
  ]
};
