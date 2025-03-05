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
    extend: {
      height: {
        'screen-minus-nav': 'calc(100vh - var(--navbar-height))',
      },
      colors: {
        border: 'hsl(var(--border))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
