import { PrismaClient } from '@prisma/client';

// Updated at: 2024-08-07T09:00:00.000Z

const schema = 'public';
export const __SEED__ = async (client: PrismaClient) => {
  const tableNames = await getAllTableNames(client);
  for (const tableName of tableNames) {
    await makeRLSPolicy(client, tableName);
  }
};

async function getAllTableNames(client: PrismaClient) {
  const tableNames: { table_name: string }[] = await client.$queryRaw`
  SELECT table_name
  FROM information_schema.tables
  WHERE table_schema = ${schema}
  `;

  return tableNames.map((x) => x.table_name);
}

async function makeRLSPolicy(client: PrismaClient, tableName: string) {
  const policyName = snakeCase(tableName) + '_rls_policy';
  await deletePolicyIfExists(client, tableName, policyName);

  const sql = `CREATE POLICY ${policyName} ON ${schema}."${tableName}" FOR ALL USING (false);`;
  await client.$queryRawUnsafe(sql);

  // Enable RLS
  await client.$executeRawUnsafe(
    `ALTER TABLE ${schema}."${tableName}" ENABLE ROW LEVEL SECURITY`,
  );
}

export async function deletePolicyIfExists(
  client: PrismaClient,
  tableName: string,
  policyName: string,
) {
  // if tableName has schema, remove it
  if (!tableName.includes('.')) {
    tableName = `${schema}."${tableName}"`;
  }

  await client.$executeRawUnsafe(`
      DROP POLICY IF EXISTS ${policyName} ON ${tableName}
  `);
}

function snakeCase(str: string) {
  return (
    str
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g,
      )
      ?.map((x) => x.toLowerCase())
      .join('_') ?? str
  );
}
