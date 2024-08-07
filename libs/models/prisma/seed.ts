import { PrismaClient } from '@prisma/client';

import { addDownStreamSeeds } from './utils/depends-on';
import { getSeedFiles } from './utils/files';
import { getSeedLogs, makeSeedLog } from './utils/logs';

const prisma = new PrismaClient();

async function main() {
  const seedLogs = await getSeedLogs(prisma);
  const seeds = await getSeedFiles();
  const toUpdate = seeds.filter(
    (x) =>
      !seedLogs.find(
        (l) => l.seed_name === x.seedName && l.checksum === x.checksum,
      ),
  );

  addDownStreamSeeds(toUpdate, seeds);

  if (!toUpdate.length) {
    console.log('\n🎉 Everything Up to Date');
    return;
  }

  const seedLogPromises = [] as Promise<unknown>[];
  for (let i = 0; i < toUpdate.length; i++) {
    const seed = toUpdate[i];
    try {
      const _module = await import(seed.path);
      await _module.__SEED__(prisma);

      seedLogPromises.push(
        makeSeedLog(prisma, {
          seed_name: seed.seedName,
          checksum: seed.checksum || '',
        }),
      );
      console.info(`✅ (${i + 1}/${toUpdate.length}) Seeded ${seed.seedName}`);
    } catch (e) {
      console.error(
        `\n\n[ERROR] Error seeding ${seed.seedName} at ${seed.path}`,
      );
      throw e;
    }
  }

  await Promise.all(seedLogPromises);

  // Clear Postgrest Schema Cache
  // https://postgrest.org/en/stable/references/schema_cache.html
  // Postgrest Randomly Errors out complaining a particular RPC wasn't found right after seeding
  await prisma.$executeRaw`NOTIFY pgrst, 'reload schema'`;
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
