import { PrismaClient } from '@prisma/client';

/**
 * Last Update: 2024-06-21 11:00:00
 */

const updatedAtModels = ['CartItem', 'WishlistItem'];

export const __SEED__ = async (client: PrismaClient) => {
  await enableExtensionModdatetime(client);
  await makeUpdateTriggers(client);
};

async function enableExtensionModdatetime(client: PrismaClient) {
  await client.$executeRaw`
        CREATE EXTENSION IF NOT EXISTS moddatetime SCHEMA public;
    `;
}

const getTriggerQuery = async (client: PrismaClient, tableName: string) => {
  return client.$executeRawUnsafe(`
      CREATE OR REPLACE TRIGGER
          handle_updated_at
          BEFORE UPDATE
          ON public."${tableName}"
          FOR EACH ROW
      EXECUTE
          PROCEDURE moddatetime("updatedAt");
    `);
};

async function makeUpdateTriggers(client: PrismaClient) {
  for (const entity of updatedAtModels) {
    await getTriggerQuery(client, entity);
  }
}
