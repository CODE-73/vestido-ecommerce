import {
  getPrismaClient,
  type PrismaModelName,
} from '@vestido-ecommerce/models';
import { slugify, VestidoError } from '@vestido-ecommerce/utils';

type ValidateSlugArgs = {
  id?: string;
  slug?: string;
  generateFrom: string;
  tableName: PrismaModelName;
};

export async function validateSlug({
  id,
  slug: incoming,
  generateFrom,
  tableName,
}: ValidateSlugArgs) {
  const prisma = getPrismaClient();

  if (!incoming || typeof incoming !== 'string' || incoming.length === 0) {
    incoming = slugify(generateFrom);
  }

  for (let i = 0; i < 10; i++) {
    // @ts-expect-error This will be a valid table name
    const slug = await prisma[tableName].findUnique({
      where: { slug: incoming },
    });

    if (!slug || (id && slug.id === id)) {
      return incoming;
    }

    incoming = `${incoming}-${Math.floor(Math.random() * 1000)}`;
  }

  throw new VestidoError({
    name: 'SlugGenerationFailed',
    message: 'Could not generate a unique slug.',
    httpStatus: 500,
    context: {
      tableName,
      generateFrom,
      attemptedSlug: incoming,
    },
  });
}
