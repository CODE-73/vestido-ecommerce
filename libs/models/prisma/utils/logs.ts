import { PrismaClient, PrismaSeed } from '@prisma/client';

export const getSeedLogs = (prisma: PrismaClient) => {
  return prisma.prismaSeed.findMany();
};

export const makeSeedLog = (
  prisma: PrismaClient,
  seed: Omit<PrismaSeed, 'id' | 'finished_at'>,
) => {
  const data = {
    ...seed,
    finished_at: new Date(),
  };

  return prisma.prismaSeed.upsert({
    create: data,
    update: data,
    where: {
      seed_name: seed.seed_name,
    },
  });
};
