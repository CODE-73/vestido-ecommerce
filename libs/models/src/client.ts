import { Prisma, PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env['NODE_ENV'] !== 'production') globalThis.prismaGlobal = prisma;

export type { PrismaClient };

export function getPrismaClient() {
  return prisma;
}

type IgnorePrismaBuiltins<S extends string> = string extends S
  ? string
  : S extends ''
    ? S
    : S extends `$${string}`
      ? never
      : S;

// https://github.com/prisma/prisma/issues/11940#issuecomment-2093185294
export type PrismaModelName = IgnorePrismaBuiltins<keyof PrismaClient & string>;

// https://stackoverflow.com/a/78539139
// export type PrismaTransactionalClient = Parameters<
//   Parameters<PrismaClient['$transaction']>[0]
// >[0];

export type PrismaTransactionalClient = Prisma.TransactionClient;
