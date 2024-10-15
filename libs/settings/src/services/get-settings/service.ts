import { getPrismaClient } from '@vestido-ecommerce/models';

export async function getSettings(key: string) {
  const prisma = getPrismaClient();

  const settings = await prisma.settings.findUnique({
    where: {
      key: key,
    },
  });

  return settings;
}
