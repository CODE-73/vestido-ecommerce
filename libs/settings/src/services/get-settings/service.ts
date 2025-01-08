import { getPrismaClient } from '@vestido-ecommerce/models';

import { formatStorefrontData } from '../storefront-data/format-storefront-data';

export async function getSettings(key: string) {
  const prisma = getPrismaClient();

  const settings = await prisma.settings.findUnique({
    where: {
      key: key,
    },
  });

  if (key == 'VESTIDO_HOME_DATA') {
    return {
      ...settings,
      value: await formatStorefrontData(settings?.value),
    };
  }

  return settings;
}
