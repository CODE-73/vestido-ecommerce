import { PrismaClient } from '@prisma/client';

let client: PrismaClient | null = null;

export function getPrismaClient() {
  if (!client) {
    client = new PrismaClient();
  }

  return client;
}

export type { PrismaClient };

type IgnorePrismaBuiltins<S extends string> = string extends S
  ? string
  : S extends ''
    ? S
    : S extends `$${string}`
      ? never
      : S;

// https://github.com/prisma/prisma/issues/11940#issuecomment-2093185294
export type PrismaModelName = IgnorePrismaBuiltins<keyof PrismaClient & string>;
