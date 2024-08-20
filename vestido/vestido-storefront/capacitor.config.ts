import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.vestidonation.app',
  appName: 'Vestido Nation',
  webDir: '../../dist/vestido/vestido-storefront',
  bundledWebRuntime: false,
  server: {
    // androidScheme: 'https',
    url: 'https://beta.vestidonation.com',
  },
};

export default config;
