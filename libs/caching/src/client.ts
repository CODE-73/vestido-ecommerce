import { createClient } from 'redis';

let client: ReturnType<typeof createClient> | null = null;

export async function getRedisClient() {
  if (!client) {
    client = createClient({
      url: process.env['REDIS_URL'],
    });

    await client.connect();
  }

  return client;
}
