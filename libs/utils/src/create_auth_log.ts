import { AuthLogType } from '@prisma/client';

import { getPrismaClient } from '@vestido-ecommerce/models';

export async function createAuthLog(profileId: string, logType: AuthLogType) {
  const prisma = getPrismaClient();
  await prisma.authLog.create({
    data: {
      profileId,
      logType,
    },
  });
}
