import { PrismaClient } from '@prisma/client';

let client: PrismaClient | null = null;

export function getPrismaClient() {
  if (!client) {
    client = new PrismaClient();
  }

  return client;
}
