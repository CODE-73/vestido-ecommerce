import { PrismaClient } from '@prisma/client';

export const __SEED__ = async (client: PrismaClient) => {
  await client.$executeRaw`
  CREATE OR REPLACE FUNCTION slugify(text) RETURNS text AS $$
    SELECT lower(regexp_replace(regexp_replace($1, '[^\\w\\s-]', '', 'g'), '\\s+', '-', 'g'));
  $$ LANGUAGE SQL IMMUTABLE STRICT;
`;

  await slugify_array(client);
};

async function slugify_array(client: PrismaClient) {
  await client.$executeRaw`
    CREATE OR REPLACE FUNCTION public.slugify_array(anyarray) RETURNS anyarray AS $$
      SELECT array_agg(slugify(n)) FROM UNNEST($1) as t(n);
    $$ LANGUAGE SQL IMMUTABLE;
  `;
}
